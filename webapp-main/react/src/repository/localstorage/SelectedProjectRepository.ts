import authorize from "../../decorators/authorize";
import { SelectedProjectId } from "@savenkorodion/webapp-model/Project";
import localStorageConfigs from "../../localStorageConfigs";
import IRepository from "@savenkorodion/repository-interfaces/IRepository";

class SelectedProjectRepository implements IRepository<SelectedProjectId> {
  @authorize()
  create(project: SelectedProjectId) {
    localStorage.setItem(
      localStorageConfigs.selectedProject,
      JSON.stringify([project])
    );
    return true;
  }

  @authorize()
  getAll() {
    const fromStorage =
      localStorage.getItem(localStorageConfigs.selectedProject) ?? "[]";
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
        localStorageConfigs.selectedProject,
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
        localStorageConfigs.selectedProject,
        JSON.stringify(projectList)
      );
      return true;
    } else return false;
  }
}

export default SelectedProjectRepository;
