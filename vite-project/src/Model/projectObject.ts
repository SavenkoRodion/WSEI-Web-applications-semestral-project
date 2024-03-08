class ProjectObject {
  name: string;
  description: string;
  id: string;
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.id = self.crypto.randomUUID();
  }
}

export default ProjectObject;
