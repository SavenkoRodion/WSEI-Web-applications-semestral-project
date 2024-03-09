import IComponentWrapper from "../../Framework-core/Model/IComponentWrapper";
import TComponent from "../../Framework-core/Model/TComponent";
import Render from "../../Framework-core/Render/Render";
import { ProjectObject } from "../../Model/projectObject";
import IRepository from "../../Repository/IRepository";

class ProjectList implements IComponentWrapper {
  #result: string = "";
  #afterRender: Array<() => any> = [];
  #projectRepository: IRepository<ProjectObject>;

  public constructor(projectRepository: IRepository<ProjectObject>) {
    this.#projectRepository = projectRepository;
  }

  public getComponent = (): TComponent => {
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
                    `<div style="border:1px solid black; padding: 5px">
                      <p>Project id: ${e.id}</p>
                      <p>Project name: ${e.name}</p>
                      <p>Project description: ${e.description}</p>
                      <button class="project-delete" id="${e.id}">Delete</button>
                      <button class="project-edit" id="${e.id}">Edit</button>
                    </div>`
                )
              : "There isn't any project yet"
          }
        </div>
      </div>`;
    this.#afterRender = this.#afterRender.concat([
      this.#applyCreateEventListeners,
    ]);
    return {
      result: this.#result,
      afterRender: this.#afterRender,
    } as TComponent;
  };

  #handleProjectDelete = (lol: string) => {
    console.log(lol);
    this.#projectRepository.delete(lol);
    Render.render();
  };

  #handleProjectEdit = () => {
    return;
  };

  #applyCreateEventListeners = () => {
    [...document.querySelectorAll(".project-delete")].map((e) =>
      e.addEventListener("click", () => {
        this.#handleProjectDelete(e.id);
      })
    );
    [...document.querySelectorAll(".project-edit")].map((e) =>
      e.addEventListener("click", () => {
        this.#handleProjectEdit();
      })
    );
  };
}

export default ProjectList;
