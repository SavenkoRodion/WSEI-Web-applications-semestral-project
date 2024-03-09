import { IProjectCreateRequest, ProjectObject } from "../Model/projectObject";
import staticConfigs from "../staticConfigs";
import IRepository from "./IRepository";

class ProjectRepository implements IRepository<ProjectObject> {
  getAll = (): Array<ProjectObject> | null => {
    const fromLocalstorage = localStorage.getItem(
      staticConfigs.localstorageProjectObjectVariable
    );
    if (!fromLocalstorage || fromLocalstorage === "undefined") return null;
    console.log(typeof fromLocalstorage);
    const result: Array<ProjectObject> = JSON.parse(fromLocalstorage);
    return result;
  };

  create = (request: IProjectCreateRequest): boolean => {
    if (!this.#isParameterValid(request.name)) return false;
    if (!this.#isParameterValid(request.description)) return false;

    const projectList: Array<ProjectObject> = this.getAll() ?? [];
    if (projectList.filter((e) => e.name === request.name)?.length) {
      return false;
    }

    projectList.push(new ProjectObject(request));
    localStorage.setItem(
      staticConfigs.localstorageProjectObjectVariable,
      JSON.stringify(projectList)
    );

    return true;
  };

  #isParameterValid = (parameter: string) => {
    if (parameter.trim() === "") return false;
    return true;
  };

  delete = (guid: string): boolean => {
    console.log(guid);
    const projectList: Array<ProjectObject> = this.getAll() ?? [];
    console.log(projectList);
    console.log(projectList.filter((e) => e.id === guid)?.length);
    if (!projectList.filter((e) => e.id === guid)?.length) {
      return false;
    }

    const index = projectList.map((e) => e.id).indexOf(guid);
    console.log(index);
    if (index !== -1) {
      projectList.splice(index, 1);
      localStorage.setItem(
        staticConfigs.localstorageProjectObjectVariable,
        JSON.stringify(projectList)
      );
    }

    return true;
  };
}

export default ProjectRepository;
