export class User {
  firstName: string;
  lastName: string;
  id: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = crypto.randomUUID();
  }
}
