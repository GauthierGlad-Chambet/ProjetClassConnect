import { User } from "../models/user.model.js";
import { createError } from "../utils/helpers.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/config.js";

export async function getAllUsersService(){
    const users = await User.find();
    if(!users || users.length == 0) {
        throw createError(404, "Aucun utilisateur trouvé");
    }
    return users;
}

export async function findOneUserService(id){
    if(id.length != 24) {
        throw createError(400, "L'id doit être de 24 caractères");
    }
    const dataUser = await User.findById(id);
    if(!dataUser) {
        throw createError(404, "Utilisateur introuvable")
    }
    return dataUser;
}


export async function addUserService(content) {
    // Vérifie que tous les champs requis sont présents
    const champsRequis = ["name", "email", "password", "role"];
    const champsManquants = champsRequis.filter(champ => !(champ in content));
    if (champsManquants.length > 0) {
        throw createError(400, "Champs manquant");
    }
    const data = User.create(content);
    return data;
}

export async function updateUserService(id, content) {
    // Vérifie que tous les champs requis sont présents
    const champsRequis = ["name", "email", "password", "role"];
    const champsManquants = champsRequis.filter(champ => !(champ in content));
    if (champsManquants.length > 0) {
        throw createError(400, "Champs manquant");
    }
    await findOneUserService(id);
    const dataUser = await User.findByIdAndUpdate(id, content, {new: true, runValidators : true});
    return dataUser;
}

export async function deleteUserService(id) {
    await findOneUserService(id);
    await User.findByIdAndDelete(id);
}

export async function loginService(userInput) {
    const {email, password} = userInput;
    const foundUser = await User.findOne({email});

    if(!foundUser) {
        throw createError(401, "Identifiants invalides");
    }
    
    const isMatch = await foundUser.comparePassword(password);
    if(!isMatch) {
        throw createError(401, "Identifiants invalides");
    }
    
    const token = jwt.sign({userId: foundUser._id},JWT_SECRET, {expiresIn : JWT_EXPIRES_IN});

    return {foundUser, token};
}