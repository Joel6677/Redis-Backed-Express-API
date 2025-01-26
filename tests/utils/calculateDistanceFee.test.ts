import calculateDistanceFee from "../../src/utils/calculateDistanceFee";


describe("calculateDistanceFee", () => {

	const distanceRanges = [
		{
			"min": 0,
			"max": 500,
			"a": 0,
			"b": 0,
			"flag": null
		},
		{
			"min": 500,
			"max": 700,
			"a": 200,
			"b": 1,
			"flag": null
		},
		{
			"min": 500,
			"max": 1000,
			"a": 100,
			"b": 1,
			"flag": null
		},
		{
			"min": 500,
			"max": 1000,
			"a": 100,
			"b": 1,
			"flag": null
		},

		{
			"min": 1000,
			"max": 0,
			"a": 0,
			"b": 0,
			"flag": null
		}
	];

	const basePrice = 199;


	it("should calculate the distance fee", () => {
		const distance = 600;
		const exptectedFee = 459;
		const distanceFee = calculateDistanceFee(distance, basePrice, distanceRanges);
		expect(distanceFee).toBe(exptectedFee);
	});
	it("should calculate distance fee with distance over max ", () => {
		const distance = 1000;
		const distanceFee = calculateDistanceFee(distance, basePrice, distanceRanges);
		expect(distanceFee).toBeNaN();
	});


});
