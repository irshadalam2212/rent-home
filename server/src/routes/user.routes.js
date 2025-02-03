import { Router } from "express";
import { login, register } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/user/register").post(register)
router.route("/user/login").post(login)

export default router