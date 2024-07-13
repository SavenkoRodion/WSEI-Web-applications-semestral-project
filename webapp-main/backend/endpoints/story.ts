import { Express } from "express";
import { MongoClient } from "mongodb";
import StoryRepository from "../repostories/StoryRepository";
import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";
import Story from "@savenkorodion/webapp-model/entities/Story";
import { verifyToken } from "./auth";

class StoryEndpoints {
  #storyRepository: StoryRepository;

  constructor(mongoClient: MongoClient) {
    this.#storyRepository = new StoryRepository(mongoClient);
  }

  mapStoryEndpoints = (app: Express) => {
    app.get("/story/all", verifyToken, async (req, res) => {
      const dbResult = await this.#storyRepository.getAll();
      res.send(JSON.stringify(dbResult));
    });

    app.get("/story", verifyToken, async (req, res) => {
      const id = req.query.id as string;

      const dbResult = await this.#storyRepository.get(id);

      res.send(JSON.stringify(dbResult));
    });

    app.post("/story", verifyToken, async (req, res) => {
      const requestObject: CreateStoryRequest = req.body;

      const dbResult = await this.#storyRepository.create(requestObject);

      res.send(JSON.stringify(dbResult));
    });

    app.put("/story", verifyToken, async (req, res) => {
      const requestObject: Story = req.body;

      const dbResult = await this.#storyRepository.replace(requestObject);

      res.send(JSON.stringify(dbResult));
    });

    app.delete("/story", verifyToken, async (req, res) => {
      const id: string = req.query.id as string;

      const dbResult = await this.#storyRepository.delete(id);

      res.send(JSON.stringify(dbResult));
    });
  };
}

export default StoryEndpoints;
