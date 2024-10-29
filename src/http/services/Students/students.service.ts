import prisma from "@/database/prisma";
import { ApplicationError } from "@/errors/application";
import { DefaultResponse } from "@/@types/default";

export class StudentService {
    async calculateDiscont(id: string): Promise<DefaultResponse> {
        const student = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                Indications: true
            }
        })

        if(!student) {
            throw new ApplicationError("Aluno não encontrado, não foi possível calcular o desconto", 404)
        }

        return {
            status: "success",
            message: "Desconto calculado",
            data: {
                indications: student.Indications.length,
                discount: `${student.discount}%`
            }
        }
    }
}