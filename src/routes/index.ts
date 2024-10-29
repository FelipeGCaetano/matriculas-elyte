import { Router } from "express";

import StudentRouter from "./student/student.routes";
import IndicationRouter from "./indications/indications.routes";

const Routes = Router()

Routes.use('/students', StudentRouter)
Routes.use('/indications', IndicationRouter)

export default Routes;