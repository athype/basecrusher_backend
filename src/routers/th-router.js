import express from "express";
import * as thController from "../controllers/th-controller.js";


const router = express.Router();

router.get('/:id', thController.getThById);
router.get('/', thController.getAllTownhalls);

export default router;