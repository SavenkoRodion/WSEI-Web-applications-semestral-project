import express from "express";

import "dotenv/config";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import getAuthEndpoints from "./endpoints/auth";
import credentials from "./credentials";
import ProjectEndpoints from "./endpoints/project";
import StoryEndpoints from "./endpoints/story";
import TaskEndpoints from "./endpoints/task";

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

const projectEndpoints = new ProjectEndpoints(client);
const storyEndpoints = new StoryEndpoints(client);
const taskEndpoints = new TaskEndpoints(client);
projectEndpoints.mapProjectEndpoints(app);
storyEndpoints.mapStoryEndpoints(app);
taskEndpoints.mapTaskEndpoints(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
