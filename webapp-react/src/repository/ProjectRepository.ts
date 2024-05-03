import authorize from "../decorators/authorize";
import { Project } from "../model/Project";
import staticConfigs from "../staticConfigs";
import IRepository from "./IRepository";

class ProjectRepository implements IRepository<Project> {
  @authorize()
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

  @authorize()
  getAll() {
    const fromStorage =
      localStorage.getItem(staticConfigs.localstorageProjectObjectVariable) ??
      "[]";
    const parsed: Project[] = JSON.parse(fromStorage);
    return parsed;
  }

  @authorize()
  delete(id: string): boolean {
    if (!id.trim()) return false;

    const projectList: Project[] = this.getAll();
    const index = projectList.map((e) => e.id).indexOf(id);

    if (index !== -1) {
      projectList.splice(index, 1);
      localStorage.setItem(
        staticConfigs.localstorageProjectObjectVariable,
        JSON.stringify(projectList)
      );
      return true;
    } else return false;
  }

  @authorize()
  replace(project: Project): boolean {
    const projectList: Project[] = this.getAll();
    const index = projectList.map((e) => e.id).indexOf(project.id);
    if (index !== -1) {
      projectList.splice(index, 1, project);
      localStorage.setItem(
        staticConfigs.localstorageProjectObjectVariable,
        JSON.stringify(projectList)
      );
      return true;
    } else return false;
  }
}

export default ProjectRepository;
