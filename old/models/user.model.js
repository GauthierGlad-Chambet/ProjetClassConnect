import fs from 'fs/promises';
import {dirname, join} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const usersPath = join(__dirname, "..","data", "users.json");


// Récupérer la liste de tous les utilisateurs
export async function getAllUsersModel(){
    const data = await fs.readFile(usersPath, "utf-8")
    return JSON.parse(data);
}

// Récupérer un utilisateur via son ID
export async function findOneUserModel(id) {
    const datas = await getAllUsersModel();
    const indexData = datas.findIndex(data=>data.id==id);
    return datas[indexData];
}

// Ajouter un utilisateur
export async function addUserModel(content) {
    let datas = await getAllUsersModel(usersPath);
    let newId = Math.max.apply(null, datas.map(data=>data.id)) +1;
    const newUser = {
        id : newId,
        ...content
    }
    datas.push(newUser);
    await fs.writeFile(usersPath, JSON.stringify(datas, null,2));
    return newUser;
}

// Modifier un utilisateur
export async function updateUserModel(id, content) {
    const datas = await getAllUsersModel();
    const indexDataToModify = datas.findIndex(data=>data.id==id);
    datas[indexDataToModify]=content;
    const datasJSON = JSON.stringify(datas, null, 2);
    await fs.writeFile(usersPath,datasJSON);
    return datas[indexDataToModify];
}

// Supprimer un utilisateur
export async function deleteUserModel(id) {
    const datas = await getAllUsersModel();
    const newDatas = datas.filter(data=>data.id!==id);
    const datasJSON = JSON.stringify(newDatas, null, 2);
    await fs.writeFile(usersPath, datasJSON);
}