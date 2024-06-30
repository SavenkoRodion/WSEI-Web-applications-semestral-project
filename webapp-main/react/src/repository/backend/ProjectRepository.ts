import Project from "@savenkorodion/webapp-model/entities/Project";
import IAsyncCrudRepository from "@savenkorodion/repository-interfaces/async/IAsyncCrudRepository";
import axios from "axios";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";

class ProjectRepository implements IAsyncCrudRepository<Project> {
  async getAll() {
    const response: Project[] = await axios({
      method: "get",
      url: "http://localhost:3000/project/all",
      responseType: "json",
    });
    return response;
  }

  async create(project: CreateProjectRequest) {
    await axios({
      method: "post",
      url: "http://localhost:3000/project/",
      data: project,
    });
    return true;
  }

  async delete(id: string) {
    await axios({
      method: "delete",
      url: "http://localhost:3000/project/",
      params: id,
    });
    return true;
  }

  async replace(project: Project) {
    await axios({
      method: "put",
      url: "http://localhost:3000/project/",
      data: project,
    });
    return true;
  }
}

export default ProjectRepository;
