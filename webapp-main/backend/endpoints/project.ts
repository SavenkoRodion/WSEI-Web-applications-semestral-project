import { Express } from "express";
import { MongoClient } from "mongodb";

const getProjectEndpoints = (app: Express, mongoClient: MongoClient) => {
  app.get("/project/all", async (req, res) => {
    await mongoClient.connect();
    const db = mongoClient.db("webapp");
    const result = await db.collection("projects").find({}).toArray();
    res.send(JSON.stringify(result));
  });
  app.get("/project/", async (req, res) => {
    console.log(req.params);
    await mongoClient.connect();
    const db = mongoClient.db("webapp");
    const result = await db.collection("projects").find({ _id: req.params });
    console.log(result);
    res.send(JSON.stringify(result));
  });
  app.post("/project/", async (req, res) => {
    console.log(req.body);
    try {
      await mongoClient.connect();
      const db = mongoClient.db("webapp");
      const lol = db.collection("projects");
      const lolek = await lol.insertOne(req.body);
      console.log(lolek);
    } catch (e) {
      console.log(e);
    }
    res.send(JSON.stringify(true));
  });
};

export default getProjectEndpoints;
