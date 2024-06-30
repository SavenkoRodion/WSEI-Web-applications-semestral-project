import { Express } from "express";

const getProjectEndpoints = (app: Express) => {
  app.get("/", (req, res) => {
    res.send("Hello World - simple api with JWT!");
  });
};

export default getProjectEndpoints;
