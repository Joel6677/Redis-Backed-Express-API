import { calculateSmallOrderSurcharge } from "../../src/utils/calculateSmallOrderSurcharge";

describe("calculateSmallOrderSurcharge", () => {


	const orderMinimumNoSurcharge = 100;
	const cartValue = 400;


	it("should calculate the difference between orderMinimumNoSurcharge and cartValue", () => {
		const smallOrderSurcharge = calculateSmallOrderSurcharge(orderMinimumNoSurcharge, cartValue);
		expect(smallOrderSurcharge).toBe(300);
	});

});
