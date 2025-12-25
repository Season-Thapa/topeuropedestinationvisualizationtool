import express from 'express';
import cors from 'cors';
import { database } from './models/database.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.use("/", express.static('public'));
app.use(express.json());

// GET Route
app.get("/api/destinations", async (req, res) => {
  const data = await database.getAll();
  res.json(data);
});

// POST Route (REQUIRED FOR ASSIGNMENT)
app.post("/api/destinations", async (req, res) => {
  const newEntry = req.body;
  const savedEntry = await database.save(newEntry);
  res.status(201).json(savedEntry);
});

app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});

export default app;