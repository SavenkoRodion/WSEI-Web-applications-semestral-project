import { MongoClient, ObjectId } from "mongodb";
import Task from "@savenkorodion/webapp-model/entities/Task";
import CreateTaskRequest from "@savenkorodion/webapp-model/requests/CreateTaskRequest";

class TaskRepository {
  #mongoClient: MongoClient;

  constructor(mongoClient: MongoClient) {
    this.#mongoClient = mongoClient;
  }

  async getAll() {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("task")
      .find<Task>({})
      .toArray();

    return result;
  }

  async get(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("task")
      .findOne<Task>({ _id: new ObjectId(id) });

    return result;
  }

  async create(requestObject: CreateTaskRequest) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("task")
      .insertOne(requestObject);

    return result.acknowledged;
  }

  async replace(task: Task) {
    const { _id, ...requestObject } = task;

    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("task")
      .replaceOne({ _id: new ObjectId(_id) }, requestObject);

    return result.acknowledged;
  }

  async delete(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("task")
      .deleteOne({ _id: new ObjectId(id) });

    return result.acknowledged;
  }
}

export default TaskRepository;
