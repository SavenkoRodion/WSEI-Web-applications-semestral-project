import ProjectObject from "../Model/projectObject";
import staticConfigs from "../staticConfigs";

class ProjectRepository implements IRepository<ProjectObject> {
  public getAll = (): Array<ProjectObject> | null => {
    const fromLocalstorage = localStorage.getItem(
      staticConfigs.localstorageProjectObjectVariable
    );
    if (!fromLocalstorage) return null;
    const result: Array<ProjectObject> = JSON.parse(fromLocalstorage);
    return result;
  };
}

export default ProjectRepository;
