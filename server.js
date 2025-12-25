import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { database } from './models/database.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3001;
const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});
app.get("/api/destinations", (req, res) => {
  const data = database.getAll();
  res.json(data);
});
app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});

export default app;