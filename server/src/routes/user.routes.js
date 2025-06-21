import { Router } from "express";
import { login, register } from "../controller/user.controller.js";

const router = Router()

router.route("/user/register").post(register)
router.route("/user/login").post(login)

export default router