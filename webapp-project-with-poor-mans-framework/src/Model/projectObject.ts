import { IRepositoryCreateRequest } from "./interfaces";

export class ProjectObject {
  name: string;
  description: string;
  id: string;
  constructor({ name, description }: IProjectCreateRequest) {
    this.name = name.trim();
    this.description = description.trim();
    this.id = self.crypto.randomUUID();
  }
}

export interface IProjectCreateRequest extends IRepositoryCreateRequest {
  name: string;
  description: string;
}
