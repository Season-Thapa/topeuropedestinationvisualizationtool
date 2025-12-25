import {executeWithResult,executeWithoutResult} from "./database.js";
import {UnexistingResourceError} from "../logic/exceptions/errorhandling.js";
import {getDestinationsPerCountry} from "../public/assets/js/datafetcher.js";

const getDestinationPerCountryQuery = "SELECT country, COUNT(*) as total \n" +
	"FROM destinations \n" +
	"GROUP BY country;";
async function getDestinationsCountsPerCountry(){
	const result = await executeWithResult(getDestinationPerCountryQuery);
	return result;
}
export {getDestinationsCountsPerCountry};