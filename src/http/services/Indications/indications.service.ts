import prisma from "@/database/prisma";
import { Prisma } from "@prisma/client";
import { DefaultResponse } from "@/@types/default";
import { ApplicationError } from "@/errors/application";

export class IndicationService {
    async create(student: Prisma.StudentCreateInput, indicator: Prisma.IndicationsCreateInput): Promise<DefaultResponse> {
        let student_id: string;

        // Verifica se o indicador existe
        const studentAlreadyExists = await prisma.student.findUnique({
            where: {
                email: student.email
            }
        })

        // Se existir vincula define o id, se não, cria
        if(!studentAlreadyExists) {
            const createStudent = await prisma.student.create({
                data: student
            })
            student_id = createStudent.id
        } else {
            student_id = studentAlreadyExists.id
        }

        // Verifica se já foi indicado por alguém
        const alreadyWasIndicated = await prisma.indications.findUnique({
            where: {
                email: indicator.email
            },
            include: {
                student: true
            }
        })

        if(!alreadyWasIndicated) {
            const createIndication = await prisma.indications.create({
                data: {
                    ...indicator,
                    student_id
                }
            })
        } else {
            throw new ApplicationError(`Aluno ${indicator.name} já indicado por`)
        }

        return {
            status: "success",
            message: "teste"
        }
    }
}