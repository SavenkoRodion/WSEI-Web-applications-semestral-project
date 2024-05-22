import { User } from "../model/User";

export interface IUserService {
  getLoggedUser: () => User | null;
}

export class UserService implements IUserService {
  getLoggedUser = () => {
    return new User("Adam", "Smith");
  };
}
