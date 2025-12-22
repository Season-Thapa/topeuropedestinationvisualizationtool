import {tourDestinations} from "../../../logic/data/dataset.js";


export function getDestinationsPerCountry() {
	const result = {};

	tourDestinations.forEach(dest => {
		const country = dest.Country;
		result[country] = (result[country] || 0) + 1;
	});

	return result;
}
