import * as PostController from "../controllers/post.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Liste de tous les messages
router.get('/', PostController.getAllPostsController);

// Trouver un message par son id
router.get('/:id', PostController.findOnePostController);

// Ajout d'un message
router.post('/', authMiddleware, PostController.addPostController);

// Modifier un message
router.put('/:id', authMiddleware, PostController.updatePostController);

// Supprimer un message
router.delete('/:id', authMiddleware, PostController.deletePostController);

export default router;
