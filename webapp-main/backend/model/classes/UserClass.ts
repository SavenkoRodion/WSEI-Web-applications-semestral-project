import { UserRole } from "@savenkorodion/webapp-model/entities/User";

export default class UserClass {
  firstName: string;
  lastName: string;
  role: UserRole;
  constructor(firstName: string, lastName: string, role: UserRole) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
