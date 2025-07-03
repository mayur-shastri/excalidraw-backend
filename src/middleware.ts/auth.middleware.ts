import { Request, Response, NextFunction } from "express";
import supabaseAdmin from "../utils/supabaseAdmin";
import { AuthenticatedRequest } from "../types";



const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Unauthorized - No token provided" });
        return;
    }

    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data?.user) {
        res.status(401).json({ error: "Unauthorized - Invalid token" });
        return;
    }

    req.user = data.user;
    next();
};

export default authMiddleware;