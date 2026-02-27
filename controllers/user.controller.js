import * as userService from "../services/user.service.js";

export async function getAllUsersController(req, res, next){
    try {
        const users = await userService.getAllUsersService();
        res.status(201).json({
            message : "Voici la liste des utilisateurs.",
            liste : users
        })
    } catch(err) {
        next(err);
    }
}

export async function findOneUserController(req, res, next){
    try {
        const dataUser = await userService.findOneUserService(req.params.id);
         res.status(200).json({
            message : `Voici l'entrée avec l'id ${id}`,
            entrée : dataUser
        })
    } catch(err) {
        next(err);
    }
}

export async function addUserController(req, res, next) {
    try {
        const content = req.body;
        const dataUser = await userService.addUserService(content);
        res.status(201).json({
            message : "Utilisateur ajouté avec succès",
            Utilisateur : dataUser
        })
    } catch(err) {
        next(err);
    }
}

export async function updateUserController(req, res, next) {
    try {
        const content = req.body;
        const dataUser = await userService.updateUserService(req.params.id, content);
        res.status(201).json({
            message : "Utilisateur modifié avec succès",
            Utilisateur : dataUser
        })
    } catch(err) {
        next(err);
    }
}

export async function deleteUserController(req, res, next) {
    try {
        await userService.deleteUserService(req.params.id);
        res.status(204).end();
    } catch(err) {
        next(err);
    }
}

export async function loginController(req, res, next) {
    try {
        const {foundUser, token} = await userService.loginService(req.body);
        const userWithoutPassword = foundUser.toObject();

        delete userWithoutPassword.password;
        res.status(200).json({
            message : "Connexion réussie",
            token : token,
            utilisateur : userWithoutPassword
        });
    } catch(err) {
        next(err);
    }
}