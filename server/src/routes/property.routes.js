import { Router } from "express";
import {
    createProperty,
    deletePropertyById,
    getAllProperty,
    getPropertyById,
    getTrendingLocations,
    UpdateProperty
} from "../controller/property.controller.js";
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

router.route("/property/:propertyId")
    .get(getPropertyById)

router.route("/property/update-property/:propertyId")
    .put(upload.fields([
        {
            name: "propertyImage",
            maxCount: 1
        }
    ]), UpdateProperty)

router.route("/property/delete-property/:propertyId")
    .delete(deletePropertyById)

router.route("/property/trending-location")
    .get(getTrendingLocations);


export default router
