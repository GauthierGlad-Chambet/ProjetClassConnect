import express from "express";
import usersRoutes from "./routes/user.route.js";
import postsRoutes from "./routes/post.route.js";

import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import { connectDatabase } from "./config/database.js";


const app = express();
const PORT = 3000;

app.use(express.json());

app.use(logger); 


async function readContentJSON(jsonFile) {
    const content = await fs.readFile(jsonFile, 'utf-8');
    const data = JSON.parse(content);
    return data;
}

async function findOne(filePath, id, res) {
    const datas = await readContentJSON(filePath);
    const indexData = datas.findIndex(data=>data.id==id);
    if(indexData == -1) {
        const error =new Error("Entrée introuvable");
        error.statusCode = 404;
        throw error;
    }
    return res.status(200).json({
        message : `Voici l'entrée avec l'id ${id}`,
        entrée : datas[indexData]
    })
}

async function addContentJSON(filePath, content, champsRequis, res) {
    // Vérifie que tous les champs requis sont présents
        const champsManquants = champsRequis.filter(champ => !(champ in content));
         if (champsManquants.length > 0) {
            const error =new Error("Champs manquants");
            error.statusCode = 400;
            throw error;
        }
    let data = await readContentJSON(filePath);
    data.push(content);
    await fs.writeFile(filePath, JSON.stringify(data, null,2));
    return {
        "message" : "Donnée ajoutée avec succès",
        "données" : data
    }
}

async function updateContent(filePath, id, content, res) {
    const datas = await readContentJSON(filePath);
    const indexDataToModify = datas.findIndex(data=>data.id==id);
    if (indexDataToModify == -1) {
        const error =new Error("Champs introuvable");
        error.statusCode = 400;
        throw error;
    }
    datas[indexDataToModify]=content;
    const datasJSON = JSON.stringify(datas, null, 2);
    await fs.writeFile(filePath,datasJSON);
    return {
        "message" : `Données à l'identifiant ${id} modifiées avec succès.`,
        "données" : datas
    }
}

async function deleteContent(filePath, id) {
    const datas = await readContentJSON(filePath);
    const newDatas = datas.filter(data=>data.id!==id);
    const datasJSON = JSON.stringify(newDatas, null, 2);
    await fs.writeFile(filePath, datasJSON);
}


// ----------------------- ROUTES ----------------------- //

app.get("/", (req, res, next) => {
    try {
        res.status(200).send("Bienvenue sur ClassConnect !");

    } catch(err) {
        next(err);
    }
}); 


// Liste de tous les utilisateurs
app.get("/users", async (req, res, next) => {
    try {
        res.status(200).json({
            message : "Voici la liste de tous les utilisateurs :",
            users : await readContentJSON(usersPath)
        })
    } catch(err) {
        next(err);
    }
});


// Ajout d'un utilisateur
app.post("/users", async (req, res, next) => {
    try {      
        const champsRequis = ["id", "name", "email", "password", "role"];
        let result = await addContentJSON(usersPath, req.body, champsRequis, res);
        res.status(201).send(result);
    } catch(err) {
        next(err);
    }
});


// Trouver un utilisateur par son id
app.get("/users/:id", checkID, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await findOne(usersPath, id, res);
        res.status(200).send(result);
    } catch(err) {
        next(err);
    }
});


// Modifier un utilisateur
app.put("/users/:id", checkID, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await updateContent(usersPath, id, req.body, res);
        res.send(result);
    } catch(err) {
        next(err);
    }
});

// Supprimer un utilisateur
app.delete("/users/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await deleteContent(usersPath, id);
        res.status(204).end();
    } catch(err) {
        next(err);
    }
});


// Liste de tous les messages
app.get("/posts", async (req, res, next) => {
    try {
        res.status(200).json({
            message : "Voici la liste de tous les messages :",
            users : await readContentJSON(postsPath)
        })
    } catch(err) {
        next(err);
    }
});

//Ajout d'un message
app.post("/posts", async (req, res, next) => {
    try {
        const champsRequis = ["id", "userId", "content", "createdAt"];
        let result = await addContentJSON(postsPath, req.body, champsRequis, res );
        res.status(201).send(result);
    } catch(err) {
        next(err);
    }   
});

// Trouver un message par son id
app.get("/posts/:id", checkID, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await findOne(postsPath, id, res);
        res.status(200).send(result);
    } catch(err) {
        next(err);
    }
});

// Modifiier un message
app.put("/posts/:id", checkID, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await updateContent(postsPath, id, req.body, res);
        res.send(result);
    } catch(err) {
        next(err);
    }
});

// Supprimer un message
app.delete("/posts/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await deleteContent(postsPath, id)
        res.status(204).end();
    } catch(err) {
        next(err);
    }
});

app.use(notFound);
app.use(errorHandler);

await connectDatabase();

app.listen(PORT, ()=> {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
})

