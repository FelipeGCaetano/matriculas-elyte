import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/Students/students.service";

class StudentController {
    async calculateDiscont(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            
            const studentService = new StudentService()
            const students = await studentService.calculateDiscont(id)
    
            return res.status(200).json(students)

        } catch (error) {
            next(error)
        }
    }
}

export default StudentController