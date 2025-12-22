import {tourDestinations} from "../../../logic/data/dataset.js";


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
