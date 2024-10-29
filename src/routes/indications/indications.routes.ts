import { Router } from "express";
import IndicationController from "@/http/controllers/indications.controller";

const IndicationRouter = Router()
const controller = new IndicationController()

IndicationRouter.get("/", controller.getAll)
IndicationRouter.get("/:id", controller.getById)
IndicationRouter.post("/", controller.create)
IndicationRouter.put("/:id", controller.update)
IndicationRouter.delete("/", controller.delete)


export default IndicationRouter;