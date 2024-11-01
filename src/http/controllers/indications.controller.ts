import { NextFunction, Request, Response } from "express";
import { IndicationService } from "../services/Indications/indications.service";

class IndicationController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const indicationService = new IndicationService()
            const indications = await indicationService.getAll()
    
            return res.status(200).json(indications)

        } catch (error) {
            next(error)
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
    
            const indicationService = new IndicationService()
            const indications = await indicationService.getById(id)
    
            return res.status(200).json(indications)

        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { student, indicator } = req.body;
    
            student.class = student.classs
            delete student.classs
    
            indicator.class = indicator.classs
            delete indicator.classs
    
            const indicationService = new IndicationService()
            const registerIndication = await indicationService.create(student, indicator)
    
            return res.status(201).json(registerIndication)
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = req.body;
    
            const indicationService = new IndicationService()
            const updateIndication = await indicationService.update(id, data)
    
            return res.status(200).json(updateIndication)

        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
    
            const indicationService = new IndicationService()
            const removeIndication = await indicationService.delete(email)
    
            return res.status(200).json(removeIndication)

        } catch (error) {
            next(error)
        }
    }
}

export default IndicationController