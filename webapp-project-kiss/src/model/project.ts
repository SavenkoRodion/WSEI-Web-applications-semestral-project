export type ProjectParams = {
  name: string;
  description: string;
};

export class Project {
  name: string;
  description: string;
  id: string;
  constructor({ name, description }: ProjectParams) {
    this.name = name;
    this.description = description;
    this.id = crypto.randomUUID();
  }
}
