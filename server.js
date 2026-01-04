import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { AddData, FetchData } from "./models/databaseRepository.js";
import 'dotenv/config';
import { WebSocketServer } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/destinations/bycountry", async (req, res, next) => {
  await FetchData.getDestinationsCountsPerCountry()
      .then(results => res.json(results))
      .catch(err => next(err));
});

app.get("/destinations/byLivingCost", async (req, res, next) => {
  await FetchData.getDestinationsCountsByLivingCost()
      .then(results => res.json(results))
      .catch(err => next(err));
});

app.get("/destinations/coordinates", async (req, res, next) => {
  await FetchData.getAllCoordinates()
      .then(results => res.json(results))
      .catch(err => next(err));
});

app.post("/destination", async (req, res, next) => {
  const newDestination = req.body;
  AddData.create(newDestination)
      .then(() => {
        broadcastUpdate();
        res.status(201).send();
      })
      .catch(err => next(err));
});


const server = app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  ws.on('error', console.error);
});

export function broadcastUpdate() {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type: 'UPDATE' }));
    }
  });
}

export default app;