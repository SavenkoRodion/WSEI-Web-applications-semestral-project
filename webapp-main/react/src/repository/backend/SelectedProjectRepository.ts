import { SelectedProjectId } from "@savenkorodion/webapp-model/entities/Project";
import axios from "axios";

class SelectedProjectRepository {
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/project/selected/",
      responseType: "json",
    });
    return response.data as SelectedProjectId[];
  }

  async replace(id: string | null) {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/project/selected",
      data: { id },
    });

    console.log(response);

    return true;
  }
}

export default SelectedProjectRepository;
