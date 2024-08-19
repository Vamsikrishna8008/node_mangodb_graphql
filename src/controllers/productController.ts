import { Request, Response, NextFunction, Router } from "express";
import { asyncHandler } from "../middleware/asyncCatchHandler";
import Product from "../model/product";

const router = Router();
// Create a new product (POST /products)
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ product: savedProduct });
  })
);

// Get all products (GET /products)
router.get(
  "/",
  asyncHandler(async (req: any, res: Response) => {
    console.log(req.user._id, "llllllh");
    const products = await Product.find();
    res.status(200).json({ products });
  })
);

// Get a product by ID (GET /products/:id)
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  })
);

// Update a product by ID (PATCH /products/:id)
router.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  })
);

// Delete a product by ID (DELETE /products/:id)
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  })
);

export default router;
