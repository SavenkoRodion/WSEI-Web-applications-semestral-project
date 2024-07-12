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

  async get(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("tasks")
      .findOne<User>({ _id: new ObjectId(id) });

    return result;
  }
}

export default UserRepository;
