import { User, UserRole } from "@savenkorodion/webapp-model/entities/User";

export interface IUserService {
  getLoggedUser: () => User | null;
}

export class UserService implements IUserService {
  getLoggedUser = () => {
    return {
      id: "43e4918c-14e5-472a-9e8b-ca377d71947e",
      firstName: "Adam",
      lastName: "Smith",
      role: UserRole.Admin,
    };
  };
}
