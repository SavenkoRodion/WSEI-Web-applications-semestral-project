export type User = {
  firstName: string;
  lastName: string;
  id: string;
  role: UserRole;
};

export enum UserRole {
  Admin,
  Devops,
  Developer,
}
