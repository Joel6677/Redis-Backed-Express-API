import calculateDistance from "../../src/utils/calculateDistance";

describe("calculateDistance", () => {

	const user_lat = 60.16842759425757;
	const user_long = 24.942651844326114;
	const venue_lat = 60.17012143;
	const venue_long = 24.92813512;

	const result = 825;

	it("should calculate the distance between two points", () => {
		const distance = calculateDistance(user_lat, user_long, venue_lat, venue_long);
		expect(distance).toBe(result);
	});

	it("should throw Error when latitude out of range", () => {
		const invalid_lat = 91;
		expect(() => calculateDistance(invalid_lat, user_long, venue_lat, venue_long)).toThrow();
	});

	it("should throw Error when longitude out of range", () => {
		const invalid_long = 200;
		expect(() => calculateDistance(user_lat, invalid_long, venue_lat, venue_long)).toThrow();

	});

	it("should throw Error when both latitude and longitude out of range", () => {
		const invalid_lat = 100;
		const invalid_long = 200;
		expect(() => calculateDistance(invalid_lat, invalid_long, venue_lat, venue_long)).toThrow();
	});

	it("should return 0 distance when user and venue are at the same coordinates", () => {
		const distance = calculateDistance(user_lat, user_long, user_lat, user_long);
		expect(distance).toBe(0);
	});

	it("should throw Error when invalid coordinates are passed as one of the arguments", () => {
		expect(() => calculateDistance(NaN, user_long, venue_lat, venue_long)).toThrow();
	});
});
