import mongoose from "mongoose";
import {MONGO_URI, NODE_ENV} from "./config.js"

export async function connectDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        if(NODE_ENV=="dev") {
            console.log("Connexion MongoDB réussie");
        }
    } catch (error) {
        if(NODE_ENV=="dev") {
            console.error("Erreur de connexion", error.message);
        }
        process.exit(1);
    }
}