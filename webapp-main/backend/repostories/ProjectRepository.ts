import Project from "@savenkorodion/webapp-model/entities/Project";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import { MongoClient, ObjectId } from "mongodb";
import getMongoClient from "../getMongoClient";

class ProjectRepository {
  #mongoClient: MongoClient;

  constructor(mongoClient: MongoClient) {
    this.#mongoClient = mongoClient;
  }

  async getAll() {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("projects")
      .find<Project>({})
      .toArray();

    //await this.#mongoClient.close();

    return result;
  }

  async get(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("projects")
      .findOne<Project>({ _id: new ObjectId(id) });

    //await this.#mongoClient.close();

    return result;
  }

  async create(requestObject: CreateProjectRequest) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("projects")
      .insertOne(requestObject);

    //await this.#mongoClient.close();

    return result.acknowledged;
  }
  async replace(project: Project) {
    const { _id, ...requestObject } = project;

    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("projects")
      .replaceOne({ _id: new ObjectId(_id) }, requestObject);

    return result.acknowledged;
  }

  async delete(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });

    //await this.#mongoClient.close();

    return result.acknowledged;
  }
}

export default ProjectRepository;
