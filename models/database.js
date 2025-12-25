import mysql from 'mysql2/promise';
import 'dotenv/config';


function openConnection() {
	return mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		port: process.env.DB_PORT,
	});
}

function convertToJsonObject(sqlResult) {
	return sqlResult.map(row => Object.fromEntries(Object.entries(row)));
}

async function executeWithResult(query, ...params) {
	const conn = await openConnection();
	try {
		const [rows] = await conn.query(query, params);
		return convertToJsonObject(rows);
	} finally {
		await conn.end(); // IMPORTANT: Close connection even if error occurs
	}
}

async function executeWithoutResult(query, ...params) {
	const conn = await openConnection();
	try {
		const [result] = await conn.query(query, params);

		return result.affectedRows;
	} finally {
		await conn.end();
	}
}


export {executeWithoutResult,executeWithResult};