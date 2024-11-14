import prisma from "@/database/prisma";
import { DefaultResponse } from "@/@types/default";
import { ApplicationError } from "@/errors/application";
import { StudentCreateInput, IndicationsCreateInput, IndicationsUpdateInput } from "@/@types/indications";

export class IndicationService {
    async getAll(): Promise<DefaultResponse> {
        const indications = await prisma.indications.findMany({
            include: {
                student: true
            }
        })

        return {
            status: "success",
            message: "Indicações coletadas com sucesso",
            data: indications
        }
    }

    async getById(id: string): Promise<DefaultResponse> {
        const indication = await prisma.indications.findUnique({
            where: {
                id
            },
            include: {
                student: true
            }
        })

        if(!indication) {
            throw new ApplicationError("Indicação não encontrada", 404)
        }

        return {
            status: "success",
            message: "Indicação coletada com sucesso",
            data: indication
        }
    }

    async create(student: StudentCreateInput, indicator: IndicationsCreateInput): Promise<DefaultResponse> {
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
                name: indicator.name,
                shift: indicator.shift,
                email: indicator.email
            },
            include: {
                student: true
            }
        })

        if(!alreadyWasIndicated) {
            await prisma.indications.create({
                data: {
                    ...indicator,
                    student_id
                }
            })
        } else {
            throw new ApplicationError(`Aluno ${indicator.name} já indicado por ${alreadyWasIndicated.student.name}`, 400)
        }

        return {
            status: "success",
            message: "Indicação registrada com sucesso"
        }
    }

    async delete(email: string): Promise<DefaultResponse> {
        const indicator = await prisma.indications.findUnique({
            where: {
                email
            }
        })

        if(!indicator) {
            throw new ApplicationError("Aluno indicado não encontrado", 404)
        }

        await prisma.indications.delete({
            where: {
                id: indicator.id
            }
        })

        return {
            status: "success",
            message: "Indicação deletada com sucesso"
        }
    }

    async update(id: string, data: IndicationsUpdateInput): Promise<DefaultResponse> {
        const indication = await prisma.indications.findUnique({
            where: {
                id
            },
            include: {
                student: true
            }
        })

        if(!indication) {
            throw new ApplicationError("Indicação não encontrada", 404)
        }

        if (data.status == "SUCESSO") {
            await prisma.student.update({
                where: {
                    id: indication.student_id
                },
                data: {
                    discount: indication.student.discount + 25
                }
            })
        }

        await prisma.indications.update({
            where: {
                id: indication.id
            },
            data
        })

        return {
            status: "success",
            message: "Indicação atualizada com sucesso"
        }
    }
}