export class User {
  firstName: string;
  lastName: string;
  id: string;
  role: UserRole;
  constructor(firstName: string, lastName: string, role: UserRole) {
    this.id = crypto.randomUUID();
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}

export enum UserRole {
  Admin,
  Devops,
  Developer,
}
