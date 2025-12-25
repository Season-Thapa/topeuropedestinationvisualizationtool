// seed.js
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
	host: process.env.DB_HOST || 'db',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
};

async function seed() {
	let connection;
	try {
		console.log(`🔌 Connecting to database...`);
		connection = await mysql.createConnection(dbConfig);

		// 1. Reset the table (DROP) so we can change the structure
		console.log("🧹 Dropping old table...");
		await connection.execute('DROP TABLE IF EXISTS destinations');

		// 2. Create the table matching your JSON fields
		console.log("🔨 Creating new table...");
		await connection.execute(`
            CREATE TABLE destinations (
                                          id INT AUTO_INCREMENT PRIMARY KEY,
                                          destination VARCHAR(255),
                                          region VARCHAR(255),
                                          country VARCHAR(255),
                                          category VARCHAR(255),
                                          latitude DOUBLE,
                                          longitude DOUBLE,
                                          annual_tourists VARCHAR(255),
                                          currency VARCHAR(255),
                                          majority_religion VARCHAR(255),
                                          famous_foods VARCHAR(255),
                                          language VARCHAR(255),
                                          best_time_to_visit VARCHAR(255),
                                          cost_of_living VARCHAR(255),
                                          safety VARCHAR(255),
                                          cultural_significance TEXT,
                                          description TEXT
            )
		`);


		console.log("📖 Reading JSON...");
		const dataPath = path.join(__dirname, 'data/euopedestination.json');

		if (!fs.existsSync(dataPath)) {
			throw new Error(`JSON file not found at: ${dataPath}`);
		}

		const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

		console.log(`🌱 Inserting ${jsonData.length} items...`);

		for (const item of jsonData) {
			await connection.execute(
				`INSERT INTO destinations
                 (destination, region, country, category, latitude, longitude, annual_tourists, currency,
                  majority_religion, famous_foods, language, best_time_to_visit, cost_of_living, safety,
                  cultural_significance, description)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					item.Destination,
					item.Region,
					item.Country,
					item.Category,
					item.Latitude,
					item.Longitude,
					item["Approximate Annual Tourists"],
					item.Currency,
					item["Majority Religion"],
					item["Famous Foods"],
					item.Language,
					item["Best Time to Visit"],
					item["Cost of Living"],
					item.Safety,
					item["Cultural Significance"],
					item.Description
				]
			);
		}
		console.log("✅ Done! Database seeded with exact JSON structure.");

	} catch (err) {
		console.error("❌ Seed Failed:", err.message);
	} finally {
		if (connection) await connection.end();
	}
}

seed();