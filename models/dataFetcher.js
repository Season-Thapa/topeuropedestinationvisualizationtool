import {executeWithResult,executeWithoutResult} from "./database.js";
import {UnexistingResourceError} from "../logic/exceptions/errorhandling.js";

const getDestinationPerCountryQuery = "SELECT country, COUNT(*) as total \n" +
	"FROM destinations \n" +
	"GROUP BY country";
const getDestinationsByLivingCost = "SELECT cost_of_living, COUNT(*) as total \n" +
	"FROM destinations \n" +
	"GROUP BY cost_of_living";
async function getDestinationsCountsPerCountry(){
	return  await executeWithResult(getDestinationPerCountryQuery);
}
async function getDestinationsCountsByLivingCost(){
	return  await executeWithResult(getDestinationsByLivingCost);
}
export {getDestinationsCountsPerCountry, getDestinationsCountsByLivingCost};
