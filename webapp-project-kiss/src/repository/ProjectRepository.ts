import { Project } from "../model/project";
import staticConfigs from "../staticConfigs";

class ProjectRepository<Project> implements IRepository<Project> {
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
}

export default ProjectRepository;
