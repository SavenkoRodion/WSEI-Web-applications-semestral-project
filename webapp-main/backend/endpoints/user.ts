import { MongoClient } from "mongodb";
import UserRepository from "../repostories/UserRepository";
import { Express } from "express";
import { verifyToken } from "./auth";

class UserEndpoints {
  #userRepository: UserRepository;

  constructor(mongoClient: MongoClient) {
    this.#userRepository = new UserRepository(mongoClient);
  }

  mapUserEndpoints = (app: Express) => {
    app.get("/user/all", verifyToken, async (req, res) => {
      const dbResult = await this.#userRepository.getAll();
      res.send(JSON.stringify(dbResult));
    });

    // app.get("/user", async (req, res) => {
    //   const id = req.query.id as string;

    //   const dbResult = await this.#userRepository.get(id);
    //   res.send(JSON.stringify(dbResult));
    // });
  };
}

export default UserEndpoints;
