type TProjectObject = {
  id: string;
  name: string;
  description: string;
};

class ProjectObject {
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.id = self.crypto.randomUUID();
  }
}
