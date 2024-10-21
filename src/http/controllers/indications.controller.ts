import { Request, Response } from "express";
import { IndicationService } from "../services/Indications/indications.service";

class IndicationController {
    async create(req: Request, res: Response) {
        const { student, indicator } = req.body;

        const indicationService = new IndicationService()
        const registerIndication = await indicationService.create(student, indicator)

        return res.status(201).json(registerIndication)
    }
}

export default IndicationController