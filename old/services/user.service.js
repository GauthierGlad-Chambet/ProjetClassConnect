import {getAllUsersModel, findOneUserModel, addUserModel, updateUserModel, deleteUserModel} from "../models/user.model.js";

export async function getAllUsersService(){
    const users = await getAllUsersModel();
    if(!users || users.length == 0) {
        const error =new Error("Aucun utilisateur trouvé");
        error.statusCode = 404;
        throw error;
    }
    return users;
}


export async function findOneUserService(id){
    if(isNaN(id)) {
        const error =new Error("L'ID doit être un nombre");
        error.statusCode = 400;
        throw error;
    }
    const dataUser = await findOneUserModel(id);
    if(!dataUser) {
        const error =new Error("Utilisateur introuvable");
        error.statusCode = 404;
        throw error;
    }
    return dataUser;
}


export async function addUserService(content) {
    // Vérifie que tous les champs requis sont présents
    const champsRequis = ["name", "email", "password", "role"];
    const champsManquants = champsRequis.filter(champ => !(champ in content));
    if (champsManquants.length > 0) {
        const error =new Error("Champs manquants");
        error.statusCode = 400;
        throw error;
    }
    const data = addUserModel(content);
    return data;
}

export async function updateUserService(id, content) {
    if(isNaN(id)) {
        const error =new Error("L'ID doit être un nombre");
        error.statusCode = 400;
        throw error;
    }
    // Vérifie que tous les champs requis sont présents
    const champsRequis = ["id", "name", "email", "password", "role"];
    const champsManquants = champsRequis.filter(champ => !(champ in content));
    if (champsManquants.length > 0) {
        const error =new Error("Champs manquants");
        error.statusCode = 400;
        throw error;
    }
    const dataUser = await updateUserModel(id, content);
    if(!dataUser) {
        const error =new Error("Utilisateur introuvable");
        error.statusCode = 404;
        throw error;
    }
    return dataUser;
}

export async function deleteUserService(id) {
    await deleteUserModel(id);
}

