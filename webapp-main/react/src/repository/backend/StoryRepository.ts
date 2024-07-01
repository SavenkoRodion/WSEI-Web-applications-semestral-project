import Story from "@savenkorodion/webapp-model/entities/Story";
import axios from "axios";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import IAsyncCrudRepository from "../interfaces/async/IAsyncCrudRepository";

class StoryRepository
  implements IAsyncCrudRepository<CreateProjectRequest, Story>
{
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/story/all",
      responseType: "json",
    });
    return response.data as Story[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/story",
      responseType: "json",
      params: id,
    });
    return response.data as Story | null;
  }

  async create(project: CreateProjectRequest) {
    await axios({
      method: "post",
      url: "http://localhost:3000/story",
      data: project,
    });
    return true;
  }

  async delete(id: string) {
    await axios({
      method: "delete",
      url: "http://localhost:3000/story",
      params: id,
    });
    return true;
  }

  async replace(project: CreateProjectRequest) {
    await axios({
      method: "put",
      url: "http://localhost:3000/story",
      data: project,
    });
    return true;
  }
}

export default StoryRepository;
