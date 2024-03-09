import { IProjectCreateRequest, ProjectObject } from "../Model/projectObject";
import staticConfigs from "../staticConfigs";
import IRepository from "./IRepository";

class ProjectRepository implements IRepository<ProjectObject> {
  public getAll = (): Array<ProjectObject> | null => {
    const fromLocalstorage = localStorage.getItem(
      staticConfigs.localstorageProjectObjectVariable
    );
    if (!fromLocalstorage) return null;
    const result: Array<ProjectObject> = JSON.parse(fromLocalstorage);
    return result;
  };

  create = (request: IProjectCreateRequest): boolean => {
    if (!this.#isParameterValid(request.name)) return false;
    if (!this.#isParameterValid(request.description)) return false;

    const projectList: Array<any> = JSON.parse(
      localStorage.getItem("projectList") ?? "[]"
    );
    projectList.push(new ProjectObject(request));
    localStorage.setItem("projectList", JSON.stringify(projectList));

    return true;
  };

  #isParameterValid = (parameter: string) => {
    if (parameter.trim() === "") return false;
    return true;
  };
}

export default ProjectRepository;
