import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import users from "../data/users";

const secret = "@123";
const router = Router();

const authMiddlewere = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", err });
    }
    next();
  });
};

export default authMiddlewere;
