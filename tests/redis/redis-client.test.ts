import { redisClient, setValue, getValue, checkRedisHealth } from '../../src/redis/redis-client';


describe('Redis Client', () => {

	// Setup the Redis client before each test
	beforeAll(async () => {
		await redisClient.connect();
	});

	// Cleanup after tests
	afterAll(async () => {
		await redisClient.quit();
	});

	it('should set and get a value', async () => {
		await setValue('testKey', 'testValue');
		const value = await getValue('testKey');
		expect(value).toBe('testValue');
	});

	it('should pass health check', async () => {
		const healthStatus = await checkRedisHealth();
		expect(healthStatus).toBe(true);
	});
});



