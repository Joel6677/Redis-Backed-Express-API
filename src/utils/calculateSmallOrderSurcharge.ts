export const calculateSmallOrderSurcharge = (orderMinimumNoSurcharge: number, cartValue: number) => {
	return Math.abs(orderMinimumNoSurcharge - cartValue);
};
