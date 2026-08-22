const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  createOrder,
  getOrders,
  myOrders,
  updateOrderStatus,          
} = require("../controllers/orderController.js");

router
  .route("/")
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router
  .route("/myOrders")
  .get(protect, myOrders)

router
  .route("/:id/status")
  .put(protect, admin, updateOrderStatus)

module.exports = router;