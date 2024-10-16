import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/cadastrar", register);

router.post("/entrar", login);

router.post("/sair", logout);

export default router;