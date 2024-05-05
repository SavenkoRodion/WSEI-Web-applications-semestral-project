import authorize from "../decorators/authorize";
import { SelectedProjectId } from "../model/Project";
import staticConfigs from "../staticConfigs";
import IRepository from "./IRepository";

class SelectedProjectRepository implements IRepository<SelectedProjectId> {
  @authorize()
  create(project: SelectedProjectId) {
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
    const parsed: SelectedProjectId[] = JSON.parse(fromStorage);
    return parsed;
  }

  @authorize()
  delete(id: string): boolean {
    if (id.trim() === "") return false;

    const projectList: SelectedProjectId[] = this.getAll();
    const index = projectList.map((e) => e.id).indexOf(id);

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
  replace(project: SelectedProjectId): boolean {
    const projectList: SelectedProjectId[] = this.getAll();
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
