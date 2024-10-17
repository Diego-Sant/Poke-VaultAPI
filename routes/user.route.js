import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/", getUsers);
router.get("/pesquisar/:id", getUser);

export default router;