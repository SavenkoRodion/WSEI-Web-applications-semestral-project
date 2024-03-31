import { User } from "../model/User";

export interface IUserHandler {
  getLoggedUser: () => User | null;
}

export class UserHandler implements IUserHandler {
  getLoggedUser = () => {
    return new User("Adam", "Smith");
  };
}
