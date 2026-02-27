import { Post } from "../models/post.model.js";
import { createError } from "../utils/helpers.js";

export async function getAllPostsService(){
    const posts = await Post.find();
    if(!posts || posts.length == 0) {
        throw createError(404, "Aucun message trouvé");
    }
    return posts;
}


export async function findOnePostService(id){
     if(id.length != 24) {
            throw createError(400, "L'id doit être de 24 caractères");
    }
    const dataPost = await Post.findById(id);
    if(!dataPost) {
        throw createError(404, "Aucun introuvable trouvé");
    }
    return dataPost;
}


export async function addPostService(content) {
    // Vérifie que tous les champs requis sont présents
    const champsRequis = ["userId", "content", "createdAt"];
    const champsManquants = champsRequis.filter(champ => !(champ in content));
    if (champsManquants.length > 0) {
        throw createError(400, "Champs manquants");
    }
    const data = Post.create(content);
    return data;
}

export async function updatePostService(id, content) {
    // Vérifie que tous les champs requis sont présents
    const champsRequis = ["userId", "content", "createdAt"];
    const champsManquants = champsRequis.filter(champ => !(champ in content));
    if (champsManquants.length > 0) {
        throw createError(400, "Champs manquants");
    }
    await findOnePostService(id)
    const dataPost = await Post.findByIdAndUpdate(id, content, {new: true, runValidators : true});
    return dataPost;
}

export async function deletePostService(id) {
    await findOnePostService(id)
    await Post.findByIdAndDelete(id);
}

