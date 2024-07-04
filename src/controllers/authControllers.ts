import { Express, Router, json } from "express";
import jwt from "jsonwebtoken";
import users from "../data/users";

const secret = "@123";
const router = Router();
router.use(json());

router.post("/login", (req, res) => {
  const { user: username, password } = req.body;
  const user = users.find((u) => u.user === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Wrong password" });
  }
  const token = jwt.sign({ id: user.user }, secret, {
    expiresIn: "30d",
  });
  res.json({ token });
});

router.post("/logout", (req, res) => {
  res.json({ token: null });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.user === username);
  if (user) {
    return res.status(401).json({ message: "User already exists!" });
  }
  users.push({ id: users.length + 1, user: username, password });

  const token = jwt.sign({ id: username }, secret, {
    expiresIn: "30d",
  });
  res.json({ token });
});

export default router;
