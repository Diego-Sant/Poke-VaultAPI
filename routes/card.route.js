import express from "express";
import { getCard, addCard, updateCard, deleteCard } from "../controllers/card.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getCard);
router.post("/", verifyToken, addCard);
router.put("/:id", verifyToken, updateCard);
router.delete("/:id", verifyToken, deleteCard);

export default router;