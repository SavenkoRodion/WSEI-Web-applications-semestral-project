export class Project {
  name: string;
  description: string;
  id: string;
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.id = crypto.randomUUID();
  }
}

export class SelectedProject {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}
