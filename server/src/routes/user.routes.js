import { Router } from "express";
import {
    login,
    register,
    getAllUser,
    getUserById
} from "../controller/user.controller.js";

const router = Router()

router.route("/user/register").post(register)
router.route("/user/login").post(login)
router.route("/users").get(getAllUser)
router.route("/users/:userId").get(getUserById)

export default router