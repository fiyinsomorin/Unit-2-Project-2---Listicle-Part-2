import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import spotsRouter from "./routes/spots.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientPath = path.join(__dirname, "../client");

app.use(express.json());
app.use(express.static(clientPath));
app.use("/api/spots", spotsRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.get("/spots/:id", (req, res) => {
  res.sendFile(path.join(clientPath, "detail.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(clientPath, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Campus Study Spots is running at http://localhost:${PORT}`);
});
