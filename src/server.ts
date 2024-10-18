import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import Routes from "./routes";
import { ErrorMiddleware } from "./http/middleware/error.middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())
app.use("/api", Routes)

app.use(ErrorMiddleware);

app.listen(PORT, () => `Servidor rodando na porta ${PORT}`);