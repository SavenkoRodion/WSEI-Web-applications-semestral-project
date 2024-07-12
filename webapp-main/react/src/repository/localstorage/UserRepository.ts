import User, { UserRole } from "@savenkorodion/webapp-model/entities/User";
import localStorageConfigs from "../../localStorageConfigs";

class UserRepository {
  getAll() {
    const parsed: User[] = [
      {
        _id: "43e4918c-14e5-472a-9e8b-ca377d71947e",
        firstName: "Adam",
        lastName: "Smith",
        role: UserRole.Admin,
      },
      {
        _id: "18a0e6cb-ef2f-42a7-9f70-cfb3d0084de3",
        firstName: "Usero",
        lastName: "Secundo",
        role: UserRole.Devops,
      },
      {
        _id: "b0739232-3d6d-406e-9577-90e788cb03d7",
        firstName: "Developer",
        lastName: "Guy",
        role: UserRole.Developer,
      },
    ];
    return parsed;
  }

  saveTokens(token: string, refreshToken: string) {
    localStorage.setItem(localStorageConfigs.token, JSON.stringify(token));
    localStorage.setItem(
      localStorageConfigs.refreshToken,
      JSON.stringify(refreshToken)
    );

    return true;
  }

  getToken() {
    return JSON.parse(localStorage.getItem(localStorageConfigs.token) ?? "");
  }

  getRefreshToken() {
    return JSON.parse(
      localStorage.getItem(localStorageConfigs.refreshToken) ?? ""
    );
  }
}

export default UserRepository;
