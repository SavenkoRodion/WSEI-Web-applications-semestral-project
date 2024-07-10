import { MongoClient, ObjectId } from "mongodb";
import CreateTaskRequest from "@savenkorodion/webapp-model/requests/CreateTaskRequest";
import TaskClass from "../model/classes/TaskClass";
import Task from "@savenkorodion/webapp-model/entities/Task";

class TaskRepository {
  #mongoClient: MongoClient;

  constructor(mongoClient: MongoClient) {
    this.#mongoClient = mongoClient;
  }

  async getAll() {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("tasks")
      .find<Task>({})
      .toArray();

    return result;
  }

  async get(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("tasks")
      .findOne<Task>({ _id: new ObjectId(id) });

    return result;
  }

  async create(requestObject: CreateTaskRequest) {
    await this.#mongoClient.connect();
    console.log(requestObject);
    const result = await this.#mongoClient
      .db("webapp")
      .collection("tasks")
      .insertOne(new TaskClass(requestObject));

    return result.acknowledged;
  }

  async replace(task: Task) {
    const { _id, ...requestObject } = task;

    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("tasks")
      .replaceOne({ _id: new ObjectId(_id) }, requestObject);

    return result.acknowledged;
  }

  async delete(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });

    return result.acknowledged;
  }
}

export default TaskRepository;
