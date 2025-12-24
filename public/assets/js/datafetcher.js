import {tourDestinations} from "../../../logic/data/dataset.js";
const API_KEY = "";
const OPENROUTEBASEURL = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}`;

export function getDestinationsPerCountry() {
	const result = {};

	tourDestinations.forEach(dest => {
		const country = dest.Country;
		result[country] = (result[country] || 0) + 1;
	});

	return result;
}
export function getDestinationsByLivingCost(){
	const result = {};

	tourDestinations.forEach(dest => {
		const livingCost = dest["Cost of Living"]?.toLowerCase();
		result[livingCost] = (result[livingCost] || 0) + 1;
	});

	return result;
}
export function getCenterLatLong() {
	return tourDestinations.map(e => [e.Latitude, e.Longitude]);
}
export async function getClosestDestinationRoute(startlat, startlong) {
	function sortHelper(element) {
		const value = distance(element.longitude, element.latitude, startlong, startlat);
		return value;
	}

	const closest = Array.from(centra).sort((a, b) => sortHelper(a) - sortHelper(b))[0];
	const location = { lat: closest.latitude, lng: closest.longitude };
	const response = await fetch(`${OPENROUTEBASEURL}&start=${startlong},${startlat}&end=${closest.longitude},${closest.latitude}`);

	const result = await response.json();
	return { location, route: result.features[0] };
}
function distance(long1, lat1, long2, lat2) {
	const r = 6371e3;
	const sigma1 = (lat1 * Math.PI) / 180;
	const sigma2 = (lat2 * Math.PI) / 180;

	const sigmadif = ((lat2 - lat1) * Math.PI) / 180;
	const lambdadif = ((long2 - long1) * Math.PI) / 180;

	const a = Math.sin(sigmadif / 2) * Math.sin(sigmadif / 2)
		+ Math.cos(sigma1) * Math.cos(sigma2) * Math.sin(lambdadif / 2) * Math.sin(lambdadif / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return r * c;
}