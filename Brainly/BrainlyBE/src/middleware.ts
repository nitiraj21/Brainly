import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) : any => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, "JEnfke");
        //@ts-ignore
        req.user = decoded;
        next(); // Correctly call next() to proceed
    } catch (err) {
        res.status(403).json({ message: "Forbidden" });
    }
};