import request from 'supertest';
import app from '../../src/app';
import axios from 'axios';
import { DynamicData, StaticData } from '../../src/types';
import { redisClient } from '../../src/redis/redis-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */



describe('GET /delivery-order-price', () => {
	const mockStaticData: StaticData = {
		data: {
			venue_raw: {
				location: {
					coordinates: [24.93087, 60.17094],
				},
			},
		},
		status: 200,
	};

	const mockDynamicData: DynamicData = {
		data: {
			venue_raw: {
				delivery_specs: {
					order_minimum_no_surcharge: 1000,
					delivery_pricing: {
						base_price: 199,
						distance_ranges: [
							{ min: 0, max: 500, a: 0, b: 0, flag: null },
							{ min: 500, max: 1000, a: 100, b: 1, flag: null },
							{ min: 1000, max: 0, a: 0, b: 0, flag: null },
						],
					},
				},
			},
		},
		status: 200,
	};

	beforeEach(() => {
		// Mock external API calls
		mockedAxios.get.mockResolvedValueOnce(mockStaticData); // Static data mock
		mockedAxios.get.mockResolvedValueOnce(mockDynamicData); // Dynamic data mock
		mockedAxios.get.mockResolvedValueOnce(mockStaticData); // Static data mock
		mockedAxios.get.mockResolvedValueOnce(mockDynamicData); // Dynamic data mock

	});


	it('should return 200 and the correct response format with valid query parameters', async () => {

		const response = await request(app)
			.get('/api/v1/delivery-order-price')
			.query({
				venue_slug: 'home-assignment-venue-helsinki',
				cart_value: 1000,
				user_lat: 60.17094,
				user_lon: 24.93087,
			});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('total_price');
		expect(response.body).toHaveProperty('small_order_surcharge');
		expect(response.body.delivery).toHaveProperty('fee');
		expect(response.body.delivery).toHaveProperty('distance');
	});

	it('should return 400 if query parameters are missing', async () => {
		const response = await request(app).get('/api/v1/delivery-order-price');

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error');
		expect(response.body.error[0]).toHaveProperty('path', ['venue_slug']);
	});

	it('should calculate the small order surcharge correctly', async () => {
		const response = await request(app)
			.get('/api/v1/delivery-order-price')
			.query({
				venue_slug: 'home-assignment-venue-helsinki',
				cart_value: 801,
				user_lat: 60.17094,
				user_lon: 24.93087,
			});

		expect(response.status).toBe(200);
		expect(response.body.small_order_surcharge).toBe(199);
	});


	it('should return 400 if the delivery distance is too long', async () => {
		const longDistanceDynamicData = {
			...mockDynamicData,
			data: {
				venue_raw: {
					delivery_specs: {
						order_minimum_no_surcharge: 1000,
						delivery_pricing: {
							base_price: 199,
							distance_ranges: [
								{ min: 0, max: 500, a: 0, b: 0, flag: null },
								{ min: 500, max: 1000, a: 100, b: 1, flag: null },
								{ min: 1000, max: 0, a: 0, b: 0, flag: null },
							],
						},
					},
				},
			},
		};

		mockedAxios.get.mockResolvedValueOnce(mockStaticData);
		mockedAxios.get.mockResolvedValueOnce(longDistanceDynamicData);
		mockedAxios.get.mockResolvedValueOnce(mockStaticData);
		mockedAxios.get.mockResolvedValueOnce(longDistanceDynamicData);


		const response = await request(app)
			.get('/api/v1/delivery-order-price')
			.query({
				venue_slug: 'home-assignment-venue-helsinki',
				cart_value: 1000,
				user_lat: 60.17094,
				user_lon: 100.93087,
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error', 'Delivery not possible: Distance too long');
	});

	it('should return 200 if the delivery is possible with valid distance and pricing', async () => {
		const validDistanceData = {
			...mockDynamicData,
			data: {
				venue_raw: {
					delivery_specs: {
						order_minimum_no_surcharge: 1000,
						delivery_pricing: {
							base_price: 199,
							distance_ranges: [
								{ min: 0, max: 500, a: 0, b: 0, flag: null },
								{ min: 500, max: 1000, a: 100, b: 1, flag: null },
								{ min: 1000, max: 0, a: 0, b: 0, flag: null },
							],
						},
					},
				},
			},
		};

		mockedAxios.get.mockResolvedValueOnce(mockStaticData);
		mockedAxios.get.mockResolvedValueOnce(validDistanceData);
		mockedAxios.get.mockResolvedValueOnce(mockStaticData);
		mockedAxios.get.mockResolvedValueOnce(validDistanceData);

		const response = await request(app)
			.get('/api/v1/delivery-order-price')
			.query({
				venue_slug: 'home-assignment-venue-helsinki',
				cart_value: 1000,
				user_lat: 60.17094,
				user_lon: 24.93087,
			});

		expect(response.status).toBe(200);
		expect(response.body.delivery.fee).toBe(190);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
	afterAll(async () => {
		await redisClient.quit();
	})
});

