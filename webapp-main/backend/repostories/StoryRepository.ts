import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";
import { Story } from "./../model/classes/Story";
import { MongoClient, ObjectId } from "mongodb";

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
      .insertOne(requestObject);

    return result.acknowledged;
  }

  async replace(story: Story) {
    const { id, ...requestObject } = story;

    await this.#mongoClient.connect();

    const result = await this.#mongoClient
      .db("webapp")
      .collection("stories")
      .replaceOne({ _id: new ObjectId(id) }, requestObject);

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
