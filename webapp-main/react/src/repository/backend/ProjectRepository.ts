import Project from "@savenkorodion/webapp-model/entities/Project";
import axios from "axios";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import IAsyncCrudRepository from "../interfaces/async/IAsyncCrudRepository";
import UserRepository from "./UserRepository";

class ProjectRepository
  implements IAsyncCrudRepository<CreateProjectRequest, Project>
{
  userRepository: UserRepository = new UserRepository();

  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/all",
      responseType: "json",
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });
    return response.data as Project[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project",
      responseType: "json",
      params: { id },
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return response.data as Project | null;
  }

  async create(project: CreateProjectRequest) {
    await axios({
      method: "post",
      url: "http://localhost:3000/project",
      data: project,
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });
    
    return true;
  }

  async delete(id: string) {
    await axios({
      method: "delete",
      url: "http://localhost:3000/project",
      params: { id },
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return true;
  }

  async replace(project: Project) {
    await axios({
      method: "put",
      url: "http://localhost:3000/project",
      data: project,
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });
    
    return true;
  }
}

export default ProjectRepository;
