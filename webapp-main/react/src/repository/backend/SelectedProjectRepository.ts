import { SelectedProjectId } from "@savenkorodion/webapp-model/entities/Project";
import axios from "axios";
import CreateSelectedProjectRequest from "@savenkorodion/webapp-model/requests/CreateSelectedProjectRequest";
import IAsyncCrudRepository from "../interfaces/async/IAsyncCrudRepository";

class SelectedProjectRepository
  implements
    IAsyncCrudRepository<CreateSelectedProjectRequest, SelectedProjectId>
{
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/selected/all",
      responseType: "json",
    });
    return response.data as SelectedProjectId[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/selected",
      responseType: "json",
      params: id,
    });
    return response.data as SelectedProjectId | null;
  }

  async create(project: CreateSelectedProjectRequest) {
    await axios({
      method: "post",
      url: "http://localhost:3000/project/selected",
      data: project,
    });
    return true;
  }

  async delete(id: string) {
    await axios({
      method: "delete",
      url: "http://localhost:3000/project/selected",
      params: id,
    });
    return true;
  }

  async replace(project: CreateSelectedProjectRequest) {
    await axios({
      method: "put",
      url: "http://localhost:3000/project/selected",
      data: project,
    });
    return true;
  }
}

export default SelectedProjectRepository;
