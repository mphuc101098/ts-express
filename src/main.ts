// import express from "express";
// import authControllers from "./controllers/authControllers";
// import postControllers from "./controllers/postControllers";

// const app = express();

// app.use("/auth", authControllers);
// app.use("/posts", postControllers);

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!!!");
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://mphuc1010:123456Aa@cluster0.jmyiqzw.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
