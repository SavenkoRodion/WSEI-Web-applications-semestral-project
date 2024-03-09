import IComponentWrapper from "../../Framework-core/Model/IComponentWrapper";
import TComponent from "../../Framework-core/Model/TComponent";
import { ProjectObject } from "../../Model/projectObject";
import IRepository from "../../Repository/IRepository";

//render shouldn't be in ctor

class ProjectList implements IComponentWrapper {
  #result: string = "";
  #afterRender: Array<() => any> = [];
  #projectRepository: IRepository<ProjectObject>;

  public constructor(projectRepository: IRepository<ProjectObject>) {
    this.#projectRepository = projectRepository;
  }

  public getComponent = (): TComponent => {
    console.log("here");
    const projects = this.#projectRepository.getAll();
    this.#result = `
      <div>
        <div>
          <h1>Project list</h1>
        </div>
        <div>
          ${
            projects?.length
              ? projects?.map(
                  (e: ProjectObject) =>
                    `<p>Project id: ${e.id}</p><p>Project name: ${e.name}</p><p>Project description: ${e.description}</p>`
                )
              : "There isn't any project yet"
          }
        </div>
      </div>`;
    this.#afterRender = [];
    return {
      result: this.#result,
      afterRender: this.#afterRender,
    } as TComponent;
  };
}

export default ProjectList;
