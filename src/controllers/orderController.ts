import { Request, Response, NextFunction, Router } from "express";
import { asyncHandler } from "../middleware/asyncCatchHandler";
import Order from "../model/orders";

const router = Router();

// Create a new order (POST /orders)
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json({ order: savedOrder });
  })
);

// Get all orders (GET /orders)
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await Order.find().populate("productId userId");
    res.status(200).json({ orders });
  })
);

// Get an order by ID (GET /orders/:id)
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      "productId userId"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  })
);

// Update an order by ID (PATCH /orders/:id)
router.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("productId userId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  })
);

// Delete an order by ID (DELETE /orders/:id)
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  })
);

export default router;
