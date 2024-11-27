import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Admin Authentication Middleware
const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from Authorization header
    const token: string = req.header("Authorization")?.replace("Bearer ", "") || "";
    console.log("Received token:", token);

    // Check if token exists
    if (!token) {
      res.status(400).json({ msg: "Please provide token" }); // Just send response, do not return
      return; // Early return after sending response
    }

    // Verify the token using JWT
    const decoded = jwt.verify(token, 'secret_key') as { admin_id: number; admin_email: string, user_type: string };
    console.log("Decoded token:", decoded);

    // Check if the user is admin
    if (decoded.user_type !== "admin") {
      res.status(403).json({ msg: "Unauthorized access. Admins only." }); // Just send response, do not return
      return; // Early return after sending response
    }
    
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ msg: "Invalid or expired token" }); // Just send response, do not return
  }
};

export { adminAuth };
