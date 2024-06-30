import { Express } from "express";
import { MongoClient } from "mongodb";

const getProjectEndpoints = (app: Express, mongoClient: MongoClient) => {
  app.get("/project/all", async (req, res) => {
    await mongoClient.connect();
    const db = mongoClient.db("webapp");
    const result = await db.collection("projects").find({}).toArray();
    await mongoClient.close();
    res.send(JSON.stringify(result));
  });
  app.post("/project/", async (req, res) => {
    console.log(req.body);
  });
};

export default getProjectEndpoints;
