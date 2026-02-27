import { JWT_SECRET } from "../config/config.js";
import { createError } from "../utils/helpers.js"

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        throw createError(401, "Vous devez être connecté pour accéder à cette page");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = JWT_EXPIRES_IN.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch(err) {
        next(createError(401, "Token invalide"));
    }

}