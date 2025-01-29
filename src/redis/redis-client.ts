import { createClient } from 'redis';

// Create and configure Redis client
export const redisClient = createClient({ url: 'redis://localhost:6379' });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Function to connect to Redis
export const connectRedis = async () => {
	await redisClient.connect();
};

// Function to set a key-value pair in Redis
export const setValue = (key: string, value: string) => {
	return redisClient.set(key, value);
};

// Function to retrieve a value by key from Redis
export const getValue = (key: string): Promise<string | null> => {
	return redisClient.get(key);
};

export const clearVenueCache = async (venue_slug: string): Promise<void> => {
	if (!redisClient.isOpen) {
		await redisClient.connect();
	}
	await redisClient.del(`venue:${venue_slug}`);
	console.log(`Cache cleared for venue: ${venue_slug}`);
};

// Health check function
export const checkRedisHealth = async (): Promise<boolean> => {
	try {
		await redisClient.set('health', 'ok');
		const reply = await redisClient.get('health');
		return reply === 'ok';
	} catch (error) {
		console.error('Redis Health Check Failed:', error);
		return false;
	}
};
