import { calculateTotalPrice } from "../../src/utils/calculateTotalPrice";

describe("calculateTotalPrice", () => {


	const smallOrderSurcharge = 5;
	const deliveryFee = 20;
	const cartValue = 400;


	it("should calculate the difference between orderMinimumNoSurcharge and cartValue", () => {
		const totalPrice = calculateTotalPrice(cartValue, smallOrderSurcharge, deliveryFee);
		expect(totalPrice).toBe(425);

	});

});
