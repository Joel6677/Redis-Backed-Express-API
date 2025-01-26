import { DistanceRanges } from "../types";


const calculateDistanceFee = (distance: number, basePrice: number, distanceRanges: DistanceRanges[]) => {

	const distanceRange = distanceRanges.filter((x) => distance >= x.min && distance < x.max);

	if (distanceRange.length === 0) {
		return NaN;
	}

	// distance ranges are sorted by min so the first element in array is correct 
	const distanceFee = basePrice + distanceRange[0].a + distanceRange[0].b * distance / 10;

	return Math.round(distanceFee);
};

export default calculateDistanceFee;
