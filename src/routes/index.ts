import { Router } from "express";

import IndicationRouter from "./indications/indications.routes";

const Routes = Router()

Routes.use('/indications', IndicationRouter)

export default Routes;