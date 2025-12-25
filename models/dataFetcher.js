import {executeWithResult,executeWithoutResult} from "./database.js";
import {UnexistingResourceError} from "../logic/exceptions/errorhandling.js";

const getDestinationPerCountryQuery = "SELECT country, COUNT(*) as total \n" +
	"FROM destinations \n" +
	"GROUP BY country";
const getDestinationsByLivingCost = "SELECT cost_of_living, COUNT(*) as total \n" +
	"FROM destinations \n" +
	"GROUP BY cost_of_living";
const destinationsMapQuery = "SELECT destination, latitude, longitude FROM destinations WHERE latitude IS NOT NULL";
async function getDestinationsCountsPerCountry(){
	return  await executeWithResult(getDestinationPerCountryQuery);
}
async function getDestinationsCountsByLivingCost(){
	return  await executeWithResult(getDestinationsByLivingCost);
}
async function getAllCoordinates(){
	return await executeWithResult(destinationsMapQuery);
}
export {getDestinationsCountsPerCountry, getDestinationsCountsByLivingCost,getAllCoordinates};
