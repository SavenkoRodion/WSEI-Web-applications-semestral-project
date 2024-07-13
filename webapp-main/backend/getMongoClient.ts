import { MongoClient, ServerApiVersion } from "mongodb";
import { credentials } from "./credentials";

const getMongoClient = () => {
  const uri = `mongodb+srv://${credentials}@cluster0.woisraq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  return new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
};

export default getMongoClient;
