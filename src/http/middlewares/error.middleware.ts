import { type Request, type Response, type NextFunction } from "express";
import { ApplicationError, ResponseError } from "../../errors/application";

export function ErrorMiddleware( err: Error, req: Request, res: Response, next: NextFunction) {
    
    const isApplicationError = err instanceof ApplicationError;
    
    const resObj: ResponseError = {
        status: "error",
        message: err.message
    };
    
    if(isApplicationError && err.details) resObj.details = err.details;
    res.status(isApplicationError ? err.statusCode : 400).json(resObj);      
}