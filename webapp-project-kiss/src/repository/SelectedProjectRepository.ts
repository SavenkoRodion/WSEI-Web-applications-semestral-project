import { SelectedProject } from "../model/Project";
import staticConfigs from "../staticConfigs";
import authorize from "../util/decorators/authorize";
import IRepository from "./IRepository";

class SelectedProjectRepository implements IRepository<SelectedProject> {
  @authorize()
  create(project: SelectedProject) {
    localStorage.setItem(
      staticConfigs.localstorageSelectedProjectVariable,
      JSON.stringify([project])
    );
    return true;
  }

  @authorize()
  getAll() {
    const fromStorage =
      localStorage.getItem(staticConfigs.localstorageSelectedProjectVariable) ??
      "[]";
    const parsed: SelectedProject[] = JSON.parse(fromStorage);
    return parsed;
  }

  @authorize()
  delete(id: string): boolean {
    if (id.trim() === "") return false;

    const projectList: SelectedProject[] = this.getAll();
    let index = projectList.map((e) => e.id).indexOf(id);

    if (index !== -1) {
      projectList.splice(index, 1);
      localStorage.setItem(
        staticConfigs.localstorageSelectedProjectVariable,
        JSON.stringify(projectList)
      );
      return true;
    } else return false;
  }

  @authorize()
  replace(project: SelectedProject): boolean {
    const projectList: SelectedProject[] = this.getAll();
    const index = projectList.map((e) => e.id).indexOf(project.id);
    if (index !== -1) {
      projectList.splice(index, 1, project);
      localStorage.setItem(
        staticConfigs.localstorageSelectedProjectVariable,
        JSON.stringify(projectList)
      );
      return true;
    } else return false;
  }
}

export default SelectedProjectRepository;
