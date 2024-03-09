import IComponentWrapper from "../../Framework-core/Model/IComponentWrapper";
import TComponent from "../../Framework-core/Model/TComponent";
import ProjectObject from "../../Model/projectObject";

//render shouldn't be in ctor

class ProjectList implements IComponentWrapper {
  #result: string;
  #afterRender: Array<() => any> = [];

  public constructor(projectRepository: IRepository<ProjectObject>) {
    const projects = projectRepository.getAll();
    console.log(projects);
    this.#result = `
      <div>
        <div>
          <h1>Project list</h1>
        </div>
        <div>
          ${
            projects?.length
              ? projects?.map(
                  (e) =>
                    `<p>Project id: ${e.id}</p><p>Project name: ${e.name}</p><p>Project description: ${e.description}</p>`
                )
              : "There isn't any project yet"
          }
        </div>
      </div>`;
    this.#afterRender = [];
  }

  public getComponent = (): TComponent => {
    return {
      result: this.#result,
      afterRender: this.#afterRender,
    } as TComponent;
  };
}

export default ProjectList;
