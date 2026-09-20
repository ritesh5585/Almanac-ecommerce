import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import app from "./src/app.js";
import { connectDb } from "./src/config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

await connectDb();

const clientPath = path.join(__dirname, "../../Client/dist");
app.use(express.static(clientPath));

app.get("*path", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
