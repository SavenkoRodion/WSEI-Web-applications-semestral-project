import authorize from "../decorators/authorize";
import localStorageConfigs from "../localStorageConfigs";
import IReadRepository from "./interfaces/IReadRepository";
import { User } from "../model/User";

class UserRepository implements IReadRepository<User> {
  @authorize()
  getAll() {
    const fromStorage = localStorage.getItem(localStorageConfigs.user) ?? "[]";
    const parsed: User[] = JSON.parse(fromStorage);
    return parsed;
  }
}

export default UserRepository;
