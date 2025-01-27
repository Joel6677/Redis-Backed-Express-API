import request from 'supertest';
import express from 'express';
import { getDeliveryOrderPrice } from '../../src/controllers/priceController';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const app = express();
app.use(express.json());
app.get('/delivery-order-price', getDeliveryOrderPrice);

describe('getDeliveryOrderPrice Controller', () => {
	beforeEach(() => {
		mockedAxios.get.mockReset();
	});

	it('should return the correct delivery price', async () => {
		// Mock static data API response
		mockedAxios.get
			.mockResolvedValueOnce({
				data: {
					venue_raw: {
						location: { coordinates: [60.17012143, 24.92813512] },
					},
				},
			}) // Mock dynamic data API response
			.mockResolvedValueOnce({
				data: {
					venue_raw: {
						delivery_specs: {
							order_minimum_no_surcharge: 1000,
							delivery_pricing: {
								base_price: 500,
								distance_ranges: [{ max: 1000, price: 500 }],
							},
						},
					},
				},
			});

		// Perform the test request
		const response = await request(app).get('/delivery-order-price').query({
			venueSlug: 'test-venue',
			cartValue: '1500', // NOTE: req.query values are strings
			userLat: '60.1684',
			userLong: '24.9281',
		});

		expect(response.status).toBe(200);
		expect(response.body.total_price).toBeDefined();
		expect(response.body.total_price).toBeGreaterThan(0);
	});
});
