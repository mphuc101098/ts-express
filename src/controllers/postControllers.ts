import { Express, Router, json } from "express";
import posts from "../data/posts";
import authMiddlewere from "../middleweres/authMiddlewere";

const router = Router();
router.use(json());

router.get("/", authMiddlewere, (req, res) => {
  res.json(posts);
});

router.get("/:id", authMiddlewere, (req, res) => {
  const id = Number(req.params.id);
  const post = posts[id];
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

router.post("/", authMiddlewere, (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.json(newPost);
});

router.put("/:id", authMiddlewere, (req, res) => {
  const id = Number(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }
  const { title, content } = req.body;
  posts[postIndex] = { id, title, content };
  res.json(posts[postIndex]);
});

router.delete("/:id", authMiddlewere, (req, res) => {
  const id = Number(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }
  const deletedPost = posts[postIndex];
  posts.splice(postIndex, 1);
  res.json(deletedPost);
});

export default router;
