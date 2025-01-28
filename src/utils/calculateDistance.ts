const convertDegreesToRadians = (degrees: number) => {
	return degrees * (Math.PI / 180);
};

const calculateDistance = (userLat: number, userLong: number, venueLat: number, venueLong: number) => {

	if (isNaN(userLat) || isNaN(userLong) || isNaN(venueLat) || isNaN(venueLong)) {
		throw new TypeError("latitude and longitude must be a number");
	}

	if (
		userLat < -90 || userLat > 90
		|| userLong < -180 || userLong > 180
		|| venueLat < -90 || venueLat > 90
		|| venueLong < -180 || venueLong > 180
	) {
		throw new RangeError("Latitude must be between -90 and 90 and Longitude between -180 and 180");
	}


	const userLatRad = convertDegreesToRadians(userLat);
	const userLongRad = convertDegreesToRadians(userLong);
	const venueLatRad = convertDegreesToRadians(venueLat);
	const venueLongRad = convertDegreesToRadians(venueLong);


	const distance = Math.acos(Math.sin(userLatRad) * Math.sin(venueLatRad) + Math.cos(userLatRad) * Math.cos(venueLatRad) * Math.cos(venueLongRad - userLongRad)) * 6371 * 1000;

	return Math.round(distance);
};

export default calculateDistance;



