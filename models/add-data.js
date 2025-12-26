import {executeWithoutResult} from "./database.js";
const INSERT_DESTINATION_QUERY = `
    INSERT INTO destinations
    (
        destination, region, country, category, latitude, longitude,
        annual_tourists, currency, majority_religion, famous_foods,
        language, best_time_to_visit, cost_of_living, safety,
        cultural_significance, description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

async function create(data){
	if (data === undefined)
		throw new BodyParsingError("Body cannot be empty");
	const params = [
		data.Destination,
		data.Region,
		data.Country,
		data.Category,
		data.Latitude || null,
		data.Longitude || null,
		data["Approximate Annual Tourists"],
		data.Currency,
		data["Majority Religion"],
		data["Famous Foods"],
		data.Language,
		data["Best Time to Visit"],
		data["Cost of Living"],
		data.Safety,
		data["Cultural Significance"],
		data.Description
	];

	await executeWithoutResult(INSERT_DESTINATION_QUERY, ...params);

}
export {create};