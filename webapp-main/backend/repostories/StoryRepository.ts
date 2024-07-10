import Story from "@savenkorodion/webapp-model/entities/Story";
import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";
import { MongoClient, ObjectId } from "mongodb";
import StoryClass from "../model/classes/StoryClass";

class StoryRepository {
  #mongoClient: MongoClient;

  constructor(mongoClient: MongoClient) {
    this.#mongoClient = mongoClient;
  }

  async getAll() {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("stories")
      .find<Story>({})
      .toArray();

    return result;
  }

  async get(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("stories")
      .findOne<Story>({ _id: new ObjectId(id) });

    return result;
  }

  async create(requestObject: CreateStoryRequest) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("stories")
      .insertOne(new StoryClass(requestObject));

    return result.acknowledged;
  }

  async replace(story: Story) {
    const { _id, ...requestObject } = story;

    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("stories")
      .replaceOne({ _id: new ObjectId(_id) }, requestObject);

    return result.acknowledged;
  }

  async delete(id: string) {
    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("stories")
      .deleteOne({ _id: new ObjectId(id) });

    return result.acknowledged;
  }
}

export default StoryRepository;
