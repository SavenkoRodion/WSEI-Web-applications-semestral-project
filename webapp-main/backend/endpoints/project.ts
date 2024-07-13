import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import { Express } from "express";
import { MongoClient } from "mongodb";
import ProjectRepository from "../repostories/ProjectRepository";
import Project from "@savenkorodion/webapp-model/entities/Project";
import SelectedProjectRepository from "../repostories/SelectedProjectRepository";
import { verifyToken } from "./auth";

class ProjectEndpoints {
  #projectRepository: ProjectRepository;
  #selectedProjectRepository: SelectedProjectRepository;

  constructor(mongoClient: MongoClient) {
    this.#projectRepository = new ProjectRepository(mongoClient);
    this.#selectedProjectRepository = new SelectedProjectRepository(
      mongoClient
    );
  }

  mapProjectEndpoints = (app: Express) => {
    app.get("/project/all", verifyToken, async (req, res) => {
      const dbResult = await this.#projectRepository.getAll();
      res.send(JSON.stringify(dbResult));
    });

    app.get("/project", verifyToken, async (req, res) => {
      const id = req.query.id as string;

      const dbResult = await this.#projectRepository.get(id);

      res.send(JSON.stringify(dbResult));
    });

    app.post("/project/", verifyToken, async (req, res) => {
      const requestObject: CreateProjectRequest = req.body;

      const dbResult = await this.#projectRepository.create(requestObject);

      res.send(JSON.stringify(dbResult));
    });

    app.put("/project/", verifyToken, async (req, res) => {
      const requestObject: Project = req.body;

      const dbResult = await this.#projectRepository.replace(requestObject);

      res.send(JSON.stringify(dbResult));
    });

    app.delete("/project/", verifyToken, async (req, res) => {
      const id: string = req.query.id as string;

      const dbResult = await this.#projectRepository.delete(id);

      res.send(JSON.stringify(dbResult));
    });

    app.get("/project/selected", verifyToken, async (req, res) => {
      const dbResult = await this.#selectedProjectRepository.getAll();
      res.send(JSON.stringify(dbResult));
    });

    app.post("/project/selected", verifyToken, async (req, res) => {
      const requestObject: string | null = req.body.id;

      const dbResult = await this.#selectedProjectRepository.replace(
        requestObject
      );

      res.send(JSON.stringify(dbResult));
    });
  };
}

export default ProjectEndpoints;
