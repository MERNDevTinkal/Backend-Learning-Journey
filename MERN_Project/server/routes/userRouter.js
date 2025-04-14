import express from "express";
import { register, login } from '../controllers/userController.js';
import logout from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);


export default router;
