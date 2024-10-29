import { Request, Response } from "express";
import { IndicationService } from "../services/Indications/indications.service";

class IndicationController {
    async getAll(req: Request, res: Response) {
        const indicationService = new IndicationService()
        const indications = await indicationService.getAll()

        return res.status(200).json(indications)
    }

    async getById(req: Request, res: Response) {
        const id = req.params.id

        const indicationService = new IndicationService()
        const indications = await indicationService.getById(id)

        return res.status(200).json(indications)
    }

    async create(req: Request, res: Response) {
        const { student, indicator } = req.body;

        const indicationService = new IndicationService()
        const registerIndication = await indicationService.create(student, indicator)

        return res.status(201).json(registerIndication)
    }

    async update(req: Request, res: Response) {
        const id = req.params.id
        const data = req.body;

        const indicationService = new IndicationService()
        const updateIndication = await indicationService.update(id, data)

        return res.status(200).json(updateIndication)
    }

    async delete(req: Request, res: Response) {
        const { email } = req.body;

        const indicationService = new IndicationService()
        const removeIndication = await indicationService.delete(email)

        return res.status(200).json(removeIndication)
    }
}

export default IndicationController