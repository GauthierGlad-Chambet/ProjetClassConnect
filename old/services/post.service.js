import {getAllPostsModel, findOnePostModel, addPostModel, updatePostModel, deletePostModel} from "../models/post.model.js";

export async function getAllPostsService(){
    const posts = await getAllPostsModel();
    if(!posts || posts.length == 0) {
        const error =new Error("Aucun message trouvé");
        error.statusCode = 404;
        throw error;
    }
    return posts;
}


export async function findOnePostService(id){
    if(isNaN(id)) {
        const error =new Error("L'ID doit être un nombre");
        error.statusCode = 400;
        throw error;
    }
    const dataPost = await findOnePostModel(id);
    if(!dataPost) {
        const error =new Error("Message introuvable");
        error.statusCode = 404;
        throw error;
    }
    return dataPost;
}


export async function addPostService(content) {
    // Vérifie que tous les champs requis sont présents
    const champsRequis = ["userId", "content", "createdAt"];
    const champsManquants = champsRequis.filter(champ => !(champ in content));
    if (champsManquants.length > 0) {
        const error =new Error("Champs manquants");
        error.statusCode = 400;
        throw error;
    }
    const data = addPostModel(content);
    return data;
}

export async function updatePostService(id, content) {
    if(isNaN(id)) {
        const error =new Error("L'ID doit être un nombre");
        error.statusCode = 400;
        throw error;
    }
    // Vérifie que tous les champs requis sont présents
    const champsRequis = ["id", "userId", "content", "createdAt"];
    const champsManquants = champsRequis.filter(champ => !(champ in content));
    if (champsManquants.length > 0) {
        const error =new Error("Champs manquants");
        error.statusCode = 400;
        throw error;
    }
    const dataPost = await updatePostModel(id, content);
    if(!dataPost) {
        const error =new Error("Message introuvable");
        error.statusCode = 404;
        throw error;
    }
    return dataPost;
}

export async function deletePostService(id) {
    await deletePostModel(id);
}

