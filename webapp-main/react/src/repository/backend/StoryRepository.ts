import Story from "@savenkorodion/webapp-model/entities/Story";
import axios from "axios";
import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";
import IAsyncCrudRepository from "../interfaces/async/IAsyncCrudRepository";
import UserRepository from "./UserRepository";

class StoryRepository
  implements IAsyncCrudRepository<CreateStoryRequest, Story>
{
  userRepository: UserRepository = new UserRepository();
  
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/story/all",
      responseType: "json",
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return response.data as Story[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/story",
      responseType: "json",
      params: { id },
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return response.data as Story | null;
  }

  async create(project: CreateStoryRequest) {
    await axios({
      method: "post",
      url: "http://localhost:3000/story",
      data: project,
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return true;
  }

  async delete(id: string) {
    await axios({
      method: "delete",
      url: "http://localhost:3000/story",
      params: { id },
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return true;
  }

  async replace(project: CreateStoryRequest) {
    await axios({
      method: "put",
      url: "http://localhost:3000/story",
      data: project,
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return true;
  }
}

export default StoryRepository;
