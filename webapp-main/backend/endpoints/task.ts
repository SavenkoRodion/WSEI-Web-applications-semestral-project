import { Express } from "express";
import { MongoClient } from "mongodb";
import TaskRepository from "../repostories/TaskRepository";
import Task from "@savenkorodion/webapp-model/entities/Task";
import CreateTaskRequest from "@savenkorodion/webapp-model/requests/CreateTaskRequest";

class TaskEndpoints {
  #taskRepository: TaskRepository;

  constructor(mongoClient: MongoClient) {
    this.#taskRepository = new TaskRepository(mongoClient);
  }

  mapTaskEndpoints = (app: Express) => {
    app.get("/task/all", async (req, res) => {
      const dbResult = await this.#taskRepository.getAll();
      res.send(JSON.stringify(dbResult));
    });

    app.get("/task", async (req, res) => {
      const id = req.query.id as string;

      const dbResult = await this.#taskRepository.get(id);

      res.send(JSON.stringify(dbResult));
    });

    app.post("/task", async (req, res) => {
      const requestObject: CreateTaskRequest = req.body;

      const dbResult = await this.#taskRepository.create(requestObject);

      res.send(JSON.stringify(dbResult));
    });

    app.put("/task", async (req, res) => {
      const requestObject: Task = req.body;

      const dbResult = await this.#taskRepository.replace(requestObject);

      res.send(JSON.stringify(dbResult));
    });

    app.delete("/task", async (req, res) => {
      const id: string = req.query.id as string;

      const dbResult = await this.#taskRepository.delete(id);

      res.send(JSON.stringify(dbResult));
    });
  };
}

export default TaskEndpoints;
