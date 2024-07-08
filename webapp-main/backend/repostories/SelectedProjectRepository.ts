import Project from "@savenkorodion/webapp-model/entities/Project";
import { MongoClient, ObjectId } from "mongodb";

class SelectedProjectRepository {
  #mongoClient: MongoClient;

  constructor(mongoClient: MongoClient) {
    this.#mongoClient = mongoClient;
  }

  async getAll() {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("selectedProject")
      .find<Project>({})
      .toArray();

    await this.#mongoClient.close();

    return result;
  }

  // async create(id: string) {
  //   await this.#mongoClient.connect();

  //   const result = await this.#mongoClient
  //     .db("webapp")
  //     .collection("selectedProject")
  //     .insertOne({ _id: new ObjectId(id) });

  //   await this.#mongoClient.close();

  //   return result.acknowledged;
  // }

  async replace(id: string | null) {
    await this.#mongoClient.connect();

    let result = (
      await this.#mongoClient
        .db("webapp")
        .collection("selectedProject")
        .deleteMany({})
    ).acknowledged;

    if (id !== null) {
      result = (
        await this.#mongoClient
          .db("webapp")
          .collection("selectedProject")
          .insertOne({ _id: new ObjectId(id) })
      ).acknowledged;
    }

    await this.#mongoClient.close();

    return result;
  }

  // async delete(id: string) {
  //   await this.#mongoClient.connect();

  //   const result = await this.#mongoClient
  //     .db("webapp")
  //     .collection("selectedProject")
  //     .deleteOne({ _id: new ObjectId(id) });

  //   await this.#mongoClient.close();

  //   return result.acknowledged;
  // }
}

export default SelectedProjectRepository;
