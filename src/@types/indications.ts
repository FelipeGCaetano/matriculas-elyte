
export interface StudentCreateInput {
    name: string
    class: string
    shift: "MANHA" | "TARDE" | "INTEGRAL"
    guardian: string
    email: string
}

export type IndicationsCreateInput = {
    name: string
    class: string
    shift: "MANHA" | "TARDE" | "INTEGRAL"
    guardian: string
    phone: string
    email: string
}

export type IndicationsUpdateInput = {
    name?: string
    class?: string
    shift?: "MANHA" | "TARDE" | "INTEGRAL"
    guardian?: string
    phone?: string
    email?: string,
    status?: "INDICADO" | "EM_PROGRESSO" | "FALHA" | "SUCESSO"
}