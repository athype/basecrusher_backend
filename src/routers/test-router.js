import express from "express";

import * as testController from "../controllers/test-controller.js";

const router = express.Router();

router.get('/', testController.returnVercel);

export default router;