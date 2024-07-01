import Task, {
  CreateTaskRequest,
} from "@savenkorodion/webapp-model/entities/Task";
import axios from "axios";
import IAsyncCrudRepository from "../interfaces/async/IAsyncCrudRepository";

class TaskRepository implements IAsyncCrudRepository<CreateTaskRequest, Task> {
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/task/all",
      responseType: "json",
    });
    return response.data as Task[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/task",
      responseType: "json",
      params: id,
    });
    return response.data as Task | null;
  }

  async create(project: CreateTaskRequest) {
    await axios({
      method: "post",
      url: "http://localhost:3000/task",
      data: project,
    });
    return true;
  }

  async delete(id: string) {
    await axios({
      method: "delete",
      url: "http://localhost:3000/task",
      params: id,
    });
    return true;
  }

  async replace(project: CreateTaskRequest) {
    await axios({
      method: "put",
      url: "http://localhost:3000/task",
      data: project,
    });
    return true;
  }
}

export default TaskRepository;
