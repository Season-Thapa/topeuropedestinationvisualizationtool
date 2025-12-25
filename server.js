import express from 'express';
import cors from 'cors';
import {
  getAllCoordinates,
  getDestinationsCountsByLivingCost,
  getDestinationsCountsPerCountry
} from "./models/dataFetcher.js";
import {InsertData} from "./models/add-data.js";
import 'dotenv/config';
import { WebSocketServer } from 'ws';

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
app.get("/destinations/coordinates", async (req, res, next) => {
  await getAllCoordinates()
  .then(results => res.json(results))
  .catch(err => next(err));
});
app.post("/destination", async (req, res,next) => {
  const newDestination  = req.body;
  InsertData.create(newDestination)
      .then(() =>{
        broadcastUpdate();
      res.status(201).send()
      })
      .catch(err => next(err));
});

const server= app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  ws.on('error', console.error);
});

// Helper function to tell everyone: "Data Changed!"
export function broadcastUpdate() {
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ type: 'UPDATE' }));
    }
  });
}
export default app;