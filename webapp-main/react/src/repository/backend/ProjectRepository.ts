import Project from "@savenkorodion/webapp-model/entities/Project";
import axios from "axios";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import IAsyncCrudRepository from "../interfaces/async/IAsyncCrudRepository";

class ProjectRepository
  implements IAsyncCrudRepository<CreateProjectRequest, Project>
{
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/all",
      responseType: "json",
    });
    return response.data as Project[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project",
      responseType: "json",
      params: { id },
    });
    return response.data as Project | null;
  }

  async create(project: CreateProjectRequest) {
    await axios({
      method: "post",
      url: "http://localhost:3000/project",
      data: project,
    });
    return true;
  }

  async delete(id: string) {
    await axios({
      method: "delete",
      url: "http://localhost:3000/project",
      params: id,
    });
    return true;
  }

  async replace(project: CreateProjectRequest) {
    await axios({
      method: "put",
      url: "http://localhost:3000/project",
      data: project,
    });
    return true;
  }
}

export default ProjectRepository;
