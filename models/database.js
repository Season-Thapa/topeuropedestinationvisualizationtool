// models/database.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	waitForConnections: true,
	connectionLimit: 10
});

export const database = {
	getAll: async () => {
		try {
			const [rows] = await pool.query('SELECT * FROM destinations');
			return rows;
		} catch (error) {
			console.error("SQL Error:", error);
			return [];
		}
	},

	save: async (data) => {
		try {
			// Logic to handle saving data matching the new table structure
			const [result] = await pool.execute(
				`INSERT INTO destinations 
                (destination, region, country, category, latitude, longitude, annual_tourists, currency, description) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					data.Destination,
					data.Region,
					data.Country,
					data.Category,
					data.Latitude,
					data.Longitude,
					data["Approximate Annual Tourists"],
					data.Currency,
					data.Description
				]
			);
			return { id: result.insertId, ...data };
		} catch (error) {
			console.error("SQL Error:", error);
			return null;
		}
	}
};