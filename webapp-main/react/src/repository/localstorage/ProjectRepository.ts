import authorize from "../../decorators/authorize";
import { Project } from "@savenkorodion/webapp-model/entities/Project";
import localStorageConfigs from "../../localStorageConfigs";
import ICrudRepository from "@savenkorodion/repository-interfaces/sync/ICrudRepository";

class ProjectRepository implements ICrudRepository<Project> {
  @authorize()
  create(project: Project) {
    const projectList: Project[] = this.getAll();
    projectList.push(project);

    localStorage.setItem(
      localStorageConfigs.project,
      JSON.stringify(projectList)
    );
    return true;
  }

  @authorize()
  getAll() {
    const fromStorage =
      localStorage.getItem(localStorageConfigs.project) ?? "[]";
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
        localStorageConfigs.project,
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
        localStorageConfigs.project,
        JSON.stringify(projectList)
      );
      return true;
    } else return false;
  }
}

export default ProjectRepository;
