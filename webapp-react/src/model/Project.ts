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

export class SelectedProjectId {
  id: string | null;
  constructor(id: string | null) {
    this.id = id;
  }
}
