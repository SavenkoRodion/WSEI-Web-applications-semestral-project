import { SelectedProjectId } from "@savenkorodion/webapp-model/entities/Project";
import axios from "axios";
import UserRepository from "./UserRepository";

class SelectedProjectRepository {
  userRepository: UserRepository = new UserRepository();
  
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/selected/",
      responseType: "json",
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });
    return response.data as SelectedProjectId[];
  }

  async replace(id: string | null) {
    await axios({
      method: "post",
      url: "http://localhost:3000/project/selected",
      data: { id },
      headers: { Authorization: `bearer ${this.userRepository.getTokenFromStorage()}` }
    });

    return true;
  }
}

export default SelectedProjectRepository;
