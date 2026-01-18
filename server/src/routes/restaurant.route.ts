import express from "express";
import { 
    createRestaurant, 
    getRestaurant, 
    getRestaurantOrder, 
    getSingleRestaurant, 
    searchRestaurant, 
    updateOrderStatus, 
    updateRestaurant,
    getAllRestaurants
} from "../controller/restaurant.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";

const router = express.Router();

// Restaurant management
router.route("/")
    .post(isAuthenticated, upload.single("imageFile"), createRestaurant)
    .get(isAuthenticated, getRestaurant)
    .put(isAuthenticated, upload.single("imageFile"), updateRestaurant);

// Restaurant orders
router.route("/order").get(isAuthenticated, getRestaurantOrder);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);

// Public search/view
// Note: searchRestaurant and getSingleRestaurant might be public or protected depending on requirement. 
// Usually searching restaurants is public for users. 
// However, the controller outline shows `req.id` usage might be needed or not?
// Let's assume public for viewing, but checking controller logic, `getSingleRestaurant` just fetches by ID. `searchRestaurant` searches.
// If they are for customers, they should be isAuthenticated if only logged-in users can order (which seems true from `order` routes).
// But usually browsing is public. Let's make them isAuthenticated to be safe as per standard restricted apps, can relax later.
// Actually, looking at `order.controller.ts`, orders are for `req.id`.
// Let's use isAuthenticated for consistency with other routes unless it's explicitly public.
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant);
router.route("/all").get(isAuthenticated, getAllRestaurants);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);

export default router;
