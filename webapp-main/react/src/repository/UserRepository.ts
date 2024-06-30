import { IReadRepository } from "@savenkorodion/repository-interfaces";
import { User, UserRole } from "../model/User";

class UserRepository implements IReadRepository<User> {
  getAll() {
    const parsed: User[] = [
      {
        id: "43e4918c-14e5-472a-9e8b-ca377d71947e",
        firstName: "Adam",
        lastName: "Smith",
        role: UserRole.Admin,
      },
      {
        id: "18a0e6cb-ef2f-42a7-9f70-cfb3d0084de3",
        firstName: "Usero",
        lastName: "Secundo",
        role: UserRole.Devops,
      },
      {
        id: "b0739232-3d6d-406e-9577-90e788cb03d7",
        firstName: "Developer",
        lastName: "Guy",
        role: UserRole.Developer,
      },
    ];
    return parsed;
  }
}

export default UserRepository;
