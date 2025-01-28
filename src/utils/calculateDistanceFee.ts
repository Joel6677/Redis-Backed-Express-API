import { DistanceRanges } from "../types";


const calculateDistanceFee = (distance: number, basePrice: number, distanceRanges: DistanceRanges[]) => {

	if (isNaN(distance) || isNaN(basePrice)) {
		throw new Error("distance or basePrice is NaN");
	}

	if (!Array.isArray(distanceRanges) || distanceRanges.length === 0) {
		throw new Error("Invalid input: distanceRanges must be a non-empty array");
	}

	const distanceRange = distanceRanges.filter((x) => distance >= x.min && distance < x.max);

	if (distanceRange.length === 0) {
		throw new Error("Delivery not possible: Distance too long");
	}

	// distance ranges are sorted by min so the first element in array is correct 
	const distanceFee = basePrice + distanceRange[0].a + distanceRange[0].b * distance / 10;

	return Math.round(distanceFee);

};

export default calculateDistanceFee;
