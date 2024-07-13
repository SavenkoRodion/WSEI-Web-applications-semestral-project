import User from "@savenkorodion/webapp-model/entities/User";
import { MongoClient, ObjectId } from "mongodb";

class UserRepository {
  #mongoClient: MongoClient;

  constructor(mongoClient: MongoClient) {
    this.#mongoClient = mongoClient;
  }

  async getAll() {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("users")
      .find<User>({})
      .toArray();

    return result;
  }

  async getByCredentials(login: string, password: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("users")
      .findOne<User>({ login: login, password: password });

    return result;
  }
}

export default UserRepository;
