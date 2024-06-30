import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const port = 3000;

const tokenSecret = process.env.TOKEN_SECRET as string;
let refreshToken: string;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World - simple api with JWT!");
});

app.post("/token", function (req, res) {
  const expTime = req.body.exp || 60;
  const token = generateToken(+expTime);
  refreshToken = generateToken(60 * 60);
  res.status(200).send({ token, refreshToken });
});
app.post("/refreshToken", function (req, res) {
  const refreshTokenFromPost = req.body.refreshToken;
  if (refreshToken !== refreshTokenFromPost) {
    res.status(400).send("Bad refresh token!");
  }
  const expTime = req.headers.exp || 60;
  const token = generateToken(+expTime);
  refreshToken = generateToken(60 * 60);
  setTimeout(() => {
    res.status(200).send({ token, refreshToken });
  }, 3000);
});
app.get("/protected/:id/:delay?", verifyToken, (req, res) => {
  const id = req.params.id;
  const delay = req.params.delay ? +req.params.delay : 1000;
  setTimeout(() => {
    res.status(200).send(`{"message": "protected endpoint ${id}"}`);
  }, delay);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function generateToken(expirationInSeconds: number) {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
  const token = jwt.sign({ exp, foo: "bar" }, tokenSecret, {
    algorithm: "HS256",
  });
  return token;
}

function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, tokenSecret, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err.message);
    }
    req.user = user;
    next();
  });
}

// Replace the placeholder with your Atlas connection string
const uri =
  "mongodb+srv://savenko662:Hard1324@cluster0.woisraq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    // Connect the client to the server (optional starting in v4.7)
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
