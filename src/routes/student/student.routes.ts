import { Router } from "express";
import StudentController from "@/http/controllers/student.controller";

const StudentRouter = Router()
const controller = new StudentController()

StudentRouter.get("/:id/calculate-discount", controller.calculateDiscont)


export default StudentRouter;