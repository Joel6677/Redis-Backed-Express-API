import { redisClient, checkRedisHealth } from '../../src/redis/redis-client';
import { RedisClientType, createClient } from 'redis';


describe('Redis Test Client', () => {
	let testRedisClient: RedisClientType;

	// Setup a separate Redis client for tests
	beforeAll(async () => {
		testRedisClient = createClient();
		await testRedisClient.connect();
	});

	// Cleanup after tests
	afterAll(async () => {
		await testRedisClient.quit();
	});

	it('should set and get a value', async () => {
		await testRedisClient.set('testKey', 'testValue');
		const value = await testRedisClient.get('testKey');
		expect(value).toBe('testValue');
	});

});

describe('Redis Client Health', () => {

	// Setup a separate Redis client for tests
	beforeAll(async () => {
		if (!redisClient.isOpen) {
			await redisClient.connect();
		}
	});

	// Cleanup after tests
	afterAll(async () => {
		await redisClient.quit();
	});


	it('should pass health check', async () => {
		const healthStatus = await checkRedisHealth();
		expect(healthStatus).toBe(true);
	});

});
