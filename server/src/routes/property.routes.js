import { Router } from "express";
import { createProperty } from "../controller/property.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/property/create-property")
    .post(upload.fields([
        {
            name: "propertyImage",
            maxCount: 1
        }
    ]),
        createProperty);

export default router
