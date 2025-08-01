import { Router } from "express";
import {
    login,
    register,
    getAllUser,
    getUserById,
    updateUser
} from "../controller/user.controller.js";

const router = Router()

router.route("/user/register").post(register)
router.route("/user/login").post(login)
router.route("/users").get(getAllUser)
router.route("/users/:userId").get(getUserById)
router.route("/users/update-user/:userId")
    .put(updateUser)

export default router