import express from "express";
import {
  addOrderItems,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect, checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, checkAdmin, getOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, checkAdmin, updateOrderToDelivered);

export default router;
