import * as UserController from "../controllers/user.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Liste de tous les utilisateurs
router.get('/', authMiddleware,  UserController.getAllUsersController);

// Trouver un utilisateur par son id
router.get('/:id', authMiddleware, UserController.findOneUserController);

// Ajout d'un utilisateur
router.post('/', authMiddleware, UserController.addUserController);

// Modifier un utilisateur
router.put('/:id', authMiddleware, UserController.updateUserController);

// Supprimer un utilisateur
router.delete('/:id', authMiddleware, UserController.deleteUserController);

// Connexion
router.post("/login", UserController.loginController);

export default router;
