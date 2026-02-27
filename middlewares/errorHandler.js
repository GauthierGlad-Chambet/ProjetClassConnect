import {NODE_ENV} from "../config/config.js";

export async function errorHandler(err, req, res, next) {
    if(NODE_ENV=="dev") {
        console.error(err);
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || "Erreur serveur interne"

    res.status(statusCode).json({
        success: false,
        status : statusCode,
        error : message
    })
}