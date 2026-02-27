import * as postService from "../services/post.service.js";

export async function getAllPostsController(req, res, next){
    try {
        const posts = await postService.getAllPostsService();
        res.status(201).json({
            message : "Voici la liste des messages.",
            liste : posts
        })
    } catch(err) {
        next(err);
    }
}

export async function findOnePostController(req, res, next){
    try {
        const id = req.params.id;
        const dataPost = await postService.findOnePostService(id);
         res.status(200).json({
            message : `Voici l'entrée avec l'id ${id}`,
            entrée : dataPost
        })
    } catch(err) {
        next(err);
    }
}

export async function addPostController(req, res, next) {
    try {
        const content = req.body;
        const dataPost = await postService.addPostService(content);
        res.status(201).json({
            message : "Message ajouté avec succès",
            Message : dataPost
        })
    } catch(err) {
        next(err);
    }
}

export async function updatePostController(req, res, next) {
    try {
        const id = req.params.id; 
        const content = req.body;
        const dataPost = await postService.updatePostService(id, content);
        res.status(201).json({
            message : "Message modifié avec succès",
            Message : dataPost
        })
    } catch(err) {
        next(err);
    }
}

export async function deletePostController(req, res, next) {
    try {
        const id = req.params.id; 
        await postService.deletePostService(id);
        res.status(204).end();
    } catch(err) {
        next(err);
    }
}