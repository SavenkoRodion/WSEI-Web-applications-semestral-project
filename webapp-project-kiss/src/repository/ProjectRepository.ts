import { Project } from "../model/project";
import staticConfigs from "../staticConfigs";
import IRepository from "./IRepository";

class ProjectRepository implements IRepository<Project> {
  create(project: Project) {
    const projectList: Project[] = this.getAll();
    console.log(projectList);
    projectList.push(project);

    localStorage.setItem(
      staticConfigs.localstorageProjectObjectVariable,
      JSON.stringify(projectList)
    );
    return true;
  }

  getAll() {
    const fromStorage =
      localStorage.getItem(staticConfigs.localstorageProjectObjectVariable) ??
      "[]";
    const parsed: Project[] = JSON.parse(fromStorage);
    return parsed;
  }

  delete(id: string): boolean {
    const projectList: Project[] = this.getAll();
    var index = projectList.map((e) => e.id).indexOf(id);
    if (index !== -1) {
      projectList.splice(index, 1);
      localStorage.setItem(
        staticConfigs.localstorageProjectObjectVariable,
        JSON.stringify(projectList)
      );
      return true;
    } else return false;
  }
}

export default ProjectRepository;
