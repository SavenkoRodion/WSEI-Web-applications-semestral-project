import Task from "@savenkorodion/webapp-model/entities/Task";
import axios from "axios";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import IAsyncCrudRepository from "../interfaces/async/IAsyncCrudRepository";

class TaskRepository
  implements IAsyncCrudRepository<CreateProjectRequest, Task>
{
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/selected/all",
      responseType: "json",
    });
    return response.data as Task[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/selected",
      responseType: "json",
      params: id,
    });
    return response.data as Task | null;
  }

  async create(project: CreateProjectRequest) {
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

  async replace(project: CreateProjectRequest) {
    await axios({
      method: "put",
      url: "http://localhost:3000/project/selected",
      data: project,
    });
    return true;
  }
}

export default TaskRepository;
