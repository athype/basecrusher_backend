import * as authorController from "../controllers/author-controller.js";
import express from "express";

const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);

router.put('/:id', authorController.updateAuthor);

router.post('/', authorController.addAuthor);

router.delete('/:id', authorController.deleteAuthor);

export default router;