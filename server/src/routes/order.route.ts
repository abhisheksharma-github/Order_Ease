import express from "express";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controller/order.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/").get(isAuthenticated, getOrders);
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(stripeWebhook);

export default router;
