import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import "./env.ts";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mainRoute from "./app/routers/MainRouter.js";
import connectDb from "./app/db/config.js";

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app: Express = express();
app.use(cors());
// Connect to MongoDB
connectDb();
// Sử dụng body-parser để xử lý các request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mainRoute(app);

const PORT = process.env.NODE_DOCKER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
