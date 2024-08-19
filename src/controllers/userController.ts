import { Request, Response, Router } from "express";
import User from "../model/user"; // Ensure you have the correct path to your User model
import { asyncHandler } from "../middleware/asyncCatchHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, "token", {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error: any) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
});
// Create a new user (POST /)
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  })
);

// Get a user by ID (GET /:id)
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  })
);

// Get all users (GET /)
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json({ users });
  })
);

// Update a user by ID (PATCH /:id)
router.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  })
);

// Delete a user by ID (DELETE /:id)
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  })
);

export default router;
