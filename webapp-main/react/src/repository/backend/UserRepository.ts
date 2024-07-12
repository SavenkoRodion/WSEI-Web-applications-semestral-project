import User from "@savenkorodion/webapp-model/entities/User";
import axios from "axios";
import localStorageConfigs from "../../localStorageConfigs";

class UserRepository {
  async getAll() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/user/all",
      responseType: "json",
    });
    return response.data as User[];
  }

  async get(id: string) {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/user",
      responseType: "json",
      params: id,
    });
    return response.data as User | null;
  }

  saveTokens(token: string, refreshToken: string) {
    localStorage.setItem(localStorageConfigs.token, JSON.stringify(token));
    localStorage.setItem(
      localStorageConfigs.refreshToken,
      JSON.stringify(refreshToken)
    );

    return true;
  }

  getTokenFromStorage() {
    return JSON.parse(localStorage.getItem(localStorageConfigs.token) ?? "");
  }

  getRefreshTokenFromStorage() {
    return JSON.parse(
      localStorage.getItem(localStorageConfigs.refreshToken) ?? ""
    );
  }

  async requestNewAuthtoken() {
    axios({
      method: "post",
      url: "http://localhost:3000/refreshToken",
      data: { refreshToken: this.getRefreshTokenFromStorage() },
    })
      .then((response) => {
        if (response.status === 200) {
          this.saveTokens(response.data.token, response.data.refreshToken);
          return true;
        }
      })
      .catch(() => false);
  }

  async authorize(login: string, password: string) {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/token",
      data: { login: login, password: password },
    });
    if (response.status === 200) {
      this.saveTokens(response.data.token, response.data.refreshToken);
      return true;
    }

    return false;
  }
}

export default UserRepository;
