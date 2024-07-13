import Task from "@savenkorodion/webapp-model/entities/Task";
import axios from "axios";
import IAsyncCrudRepository from "../interfaces/async/IAsyncCrudRepository";
import CreateTaskRequest from "@savenkorodion/webapp-model/requests/CreateTaskRequest";
import UserRepository from "./UserRepository";

class TaskRepository implements IAsyncCrudRepository<CreateTaskRequest, Task> {
  userRepository: UserRepository = new UserRepository();
  
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/task/all",
      responseType: "json",
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return response.data as Task[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/task",
      responseType: "json",
      params: { id },
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return response.data as Task | null;
  }

  async create(project: CreateTaskRequest) {
    await axios({
      method: "post",
      url: "http://localhost:3000/task",
      data: project,
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return true;
  }

  async delete(id: string) {
    await axios({
      method: "delete",
      url: "http://localhost:3000/task",
      params: { id },
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return true;
  }

  async replace(project: Task) {
    await axios({
      method: "put",
      url: "http://localhost:3000/task",
      data: project,
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return true;
  }
}

export default TaskRepository;
