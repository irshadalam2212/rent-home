import { Router } from "express";
import { createProperty, getAllProperty } from "../controller/property.controller.js";
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

router.route("/property/all-properties")
    .get(getAllProperty)

export default router
