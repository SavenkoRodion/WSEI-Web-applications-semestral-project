import { Express } from "express";
import { MongoClient } from "mongodb";
import StoryRepository from "../repostories/StoryRepository";
import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";
import Story from "@savenkorodion/webapp-model/entities/Story";

class StoryEndpoints {
  #storyRepository: StoryRepository;

  constructor(mongoClient: MongoClient) {
    this.#storyRepository = new StoryRepository(mongoClient);
  }

  mapStoryEndpoints = (app: Express) => {
    app.get("/story/all", async (req, res) => {
      const dbResult = await this.#storyRepository.getAll();
      res.send(JSON.stringify(dbResult));
    });

    app.get("/story", async (req, res) => {
      const id = req.query.id as string;

      const dbResult = await this.#storyRepository.get(id);

      res.send(JSON.stringify(dbResult));
    });

    app.post("/story", async (req, res) => {
      const requestObject: CreateStoryRequest = req.body;

      const dbResult = await this.#storyRepository.create(requestObject);

      res.send(JSON.stringify(dbResult));
    });

    app.put("/story", async (req, res) => {
      const requestObject: Story = req.body;

      const dbResult = await this.#storyRepository.replace(requestObject);

      res.send(JSON.stringify(dbResult));
    });

    app.delete("/story", async (req, res) => {
      const id: string = req.query.id as string;

      const dbResult = await this.#storyRepository.delete(id);

      res.send(JSON.stringify(dbResult));
    });
  };
}

export default StoryEndpoints;
