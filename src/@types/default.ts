export interface DefaultResponse {
    status: "success" | "error",
    message: string,
    data?: any
}