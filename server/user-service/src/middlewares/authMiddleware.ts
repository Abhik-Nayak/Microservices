import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!, {
    ignoreExpiration: true,
  });

  if (decoded.exp * 1000 < Date.now()) {
    return res.status(401).json({ message: "Token expired" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!, {
      ignoreExpiration: true,
    });

    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token expired" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
