export const calculateTotalPrice = (cartValue: number, smallOrderSurcharge: number, deliveryFee: number) => {
	return cartValue + smallOrderSurcharge + deliveryFee;
};
