import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user"; // Ensure the correct path to your User model

interface AuthRequest extends Request {
  user?: any; // Extending the Request interface to include user
}

export const authHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.headers.authorization) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, "token");

      // Find the user by ID (decoded from the token) and ensure they exist
      const user = await User.findById((decoded as any).id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found, authorization denied" });
      }

      // Attach the user to the request object
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (error: any) {
      console.error(`JWT verification failed: ${error.message}`);
      res
        .status(401)
        .json({ message: "Not authorized, token verification failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
