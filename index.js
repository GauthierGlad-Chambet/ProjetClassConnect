import express from "express";
import usersRoutes from "./routes/user.route.js";
import postsRoutes from "./routes/post.route.js";

import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import { connectDatabase } from "./config/database.js";
import {PORT, NODE_ENV} from "./config/config.js";

const app = express();

app.use(express.json());
app.use(logger); 

await connectDatabase();

// ----------------------- ROUTES ----------------------- //

app.get("/", (req, res, next) => {
    try {
        res.status(200).send("Bienvenue sur ClassConnect !");

    } catch(err) {
        next(err);
    }
}); 


app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, ()=> {
    if(NODE_ENV=="dev") {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    }
})

