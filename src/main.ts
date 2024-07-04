import express from "express";
import authControllers from "./controllers/authControllers";
import postControllers from "./controllers/postControllers";

const app = express();

app.use("/auth", authControllers);
app.use("/posts", postControllers);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
