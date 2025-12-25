import express from 'express';
import cors from 'cors';
import {getDestinationsCountsByLivingCost, getDestinationsCountsPerCountry} from "./models/dataFetcher.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use("/", express.static('public'));
app.use(express.json());

// GET Route
app.get("/destinations/bycountry", async (req, res,next) => {
  await getDestinationsCountsPerCountry()
      .then(results => res.json(results))
      .catch(err => next(err));
});
app.get("/destinations/byLivingCost", async (req, res,next) => {
  await getDestinationsCountsByLivingCost()
      .then(results => res.json(results))
      .catch(err => next(err));
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