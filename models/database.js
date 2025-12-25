import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
; // Ensure this import exists!
// We need to recreate __dirname because it doesn't exist in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../data/euopedestination.json');

export const database = {
	// READ: Load all destinations
	getAll: () => {
		try {
			const data = fs.readFileSync(dbPath, 'utf8');
			return JSON.parse(data);
		} catch (error) {
			console.error("Error reading database:", error);
			return [];
		}
	},

	// WRITE: Save a new destination
	save: (newEntry) => {
		try {
			const currentData = database.getAll();

			// Auto-generate a simple ID
			newEntry.id = currentData.length + 1;

			currentData.push(newEntry);

			fs.writeFileSync(dbPath, JSON.stringify(currentData, null, 2));
			return newEntry;
		} catch (error) {
			console.error("Error saving to database:", error);
			return null;
		}
	}
};

