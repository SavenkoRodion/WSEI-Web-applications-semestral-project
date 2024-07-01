import express from "express";

import "dotenv/config";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import getAuthEndpoints from "./endpoints/auth";
import getProjectEndpoints from "./endpoints/project";
import credentials from "./credentials";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${credentials}@cluster0.woisraq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

getAuthEndpoints(app);
getProjectEndpoints(app, client);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     // await client.connect();
//     // // Send a ping to confirm a successful connection
//     // await client.db("admin").command({ ping: 1 });
//     // console.log(
//     //   "Pinged your deployment. You successfully connected to MongoDB!"
//     // );
//     await client.connect();
//     const db = client.db("webapp");
//     console.log(await db.collection("projects").find({}).toArray());
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
