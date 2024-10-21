import { Router } from "express";
import IndicationController from "@/http/controllers/indications.controller";

const IndicationRouter = Router()
const controller = new IndicationController()

IndicationRouter.post("/", controller.create)


export default IndicationRouter;