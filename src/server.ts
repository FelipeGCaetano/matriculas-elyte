import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import Routes from "./routes";
import { ErrorMiddleware } from "./http/middlewares/error.middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())
app.use("/api", Routes)

app.use(ErrorMiddleware);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));