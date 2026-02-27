import fs from 'fs/promises';
import {dirname, join} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const postsPath = join(__dirname, "..", "data", "posts.json");


// Récupérer la liste de tous les messages
export async function getAllPostsModel(){
    const data = await fs.readFile(postsPath, "utf-8")
    return JSON.parse(data);
}

// Récupérer un message via son ID
export async function findOnePostModel(id) {
    const datas = await getAllPostsModel();
    const indexData = datas.findIndex(data=>data.id==id);
    return datas[indexData];
}

// Ajouter un message
export async function addPostModel(content) {
    let datas = await getAllPostsModel(postsPath);
    let newId = Math.max.apply(null, datas.map(data=>data.id)) +1;
    const newPost = {
        id : newId,
        ...content
    }
    datas.push(newPost);
    await fs.writeFile(postsPath, JSON.stringify(datas, null,2));
    return newPost;
}

// Modifier un message
export async function updatePostModel(id, content) {
    const datas = await getAllPostsModel();
    const indexDataToModify = datas.findIndex(data=>data.id==id);
    datas[indexDataToModify]=content;
    const datasJSON = JSON.stringify(datas, null, 2);
    await fs.writeFile(postsPath,datasJSON);
    return datas[indexDataToModify];
}

// Supprimer un message
export async function deletePostModel(id) {
    const datas = await getAllPostsModel();
    const newDatas = datas.filter(data=>data.id!==id);
    const datasJSON = JSON.stringify(newDatas, null, 2);
    await fs.writeFile(postsPath, datasJSON);
}