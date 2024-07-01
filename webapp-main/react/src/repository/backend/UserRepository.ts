import User from "@savenkorodion/webapp-model/entities/User";
import axios from "axios";
import IAsyncReadRepository from "../interfaces/async/IAsyncReadRepository";

class UserRepository implements IAsyncReadRepository<User> {
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/selected/all",
      responseType: "json",
    });
    return response.data as User[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/selected",
      responseType: "json",
      params: id,
    });
    return response.data as User | null;
  }
}

export default UserRepository;
