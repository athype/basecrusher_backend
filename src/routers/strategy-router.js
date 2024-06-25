import * as stratController from "../controllers/strategy-controller.js";
import express from "express";

const router = express.Router();

router.get('/', stratController.getAllStrategies);
router.get('/:id', stratController.getStrategyByID);
router.get('/townhalls/:id', stratController.getStrategyByThId);
router.get('/', stratController.getStrategyByAuthorName);

router.put('/:id', stratController.updateStrategy);

router.post('/', stratController.addStrategy);

router.delete('/:id', stratController.deleteStrategy);

export default router;