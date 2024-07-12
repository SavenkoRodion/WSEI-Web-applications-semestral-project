import { MongoClient } from "mongodb";
import UserRepository from "../repostories/UserRepository";
import { Express } from "express";

class UserEndpoints {
  #userRepository: UserRepository;

  constructor(mongoClient: MongoClient) {
    this.#userRepository = new UserRepository(mongoClient);
  }

  mapUserEndpoints = (app: Express) => {
    app.get("/user/all", async (req, res) => {
      const dbResult = await this.#userRepository.getAll();
      console.log(dbResult);
      res.send(JSON.stringify(dbResult));
    });

    app.get("/user", async (req, res) => {
      const id = req.query.id as string;

      const dbResult = await this.#userRepository.get(id);
      console.log(dbResult);
      res.send(JSON.stringify(dbResult));
    });
  };
}

export default UserEndpoints;
