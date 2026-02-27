import {NODE_ENV} from "../config/config.js";

export async function logger(req, res, next) {
    if(NODE_ENV=="dev") {
        console.log(`Nouvelle reqûete : ${req.method} ${req.url}`);
    }
    next();
}