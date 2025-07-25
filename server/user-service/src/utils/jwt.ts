import jwt from "jsonwebtoken";

export const generateToken = (payload: any) =>
  jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!)