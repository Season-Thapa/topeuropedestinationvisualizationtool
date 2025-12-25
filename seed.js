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
			// Map JSON keys to SQL columns
			// We use item["Key Name"] because some keys have spaces
			await connection.execute(
				`INSERT INTO destinations 
                (destination, region, country, category, latitude, longitude, annual_tourists, currency, description) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					item.Destination,
					item.Region,
					item.Country,
					item.Category,
					item.Latitude,
					item.Longitude,
					item["Approximate Annual Tourists"], // Kept as String ("14 million")
					item.Currency,
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