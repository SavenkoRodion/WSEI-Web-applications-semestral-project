import IComponentWrapper from "../../Framework-core/Model/IComponentWrapper";
import TComponent from "../../Framework-core/Model/TComponent";
import {
  IProjectCreateRequest,
  ProjectObject,
} from "../../Model/projectObject";
import IRepository from "../../Repository/IRepository";

//this should implement interface with one method: getComponent, other methods should be private

class ProjectElement implements IComponentWrapper {
  #result: string = "";
  #afterRender: Array<() => any> = [];
  #repository: IRepository<ProjectObject>;

  public constructor(projectRepository: IRepository<ProjectObject>) {
    this.#repository = projectRepository;
  }

  public getComponent = (): TComponent => {
    this.#result = `<div style="border:1px solid black; padding: 5px">
    <p>Project id: ${e.id}</p>
    <p>Project name: ${e.name}</p>
    <p>Project description: ${e.description}</p>
    <button class="project-delete" id="${e.id}">Delete</button>
    <button class="project-edit" id="${e.id}">Edit</button>
  </div>`;

    this.#afterRender = this.#afterRender.concat([
      this.#applyCreateEventListeners,
    ]);
    return {
      result: this.#result,
      afterRender: this.#afterRender,
    };
  };

  #handleProjectCreate = () => {
    const nameInput = document.querySelector<HTMLInputElement>("#project-name");
    if (!nameInput?.value) {
      nameInput?.reportValidity();
      return;
    }

    const descriptionInput = document.querySelector<HTMLInputElement>(
      "#project-description"
    );
    if (!descriptionInput?.value) {
      descriptionInput?.reportValidity();
      return;
    }

    const result = this.#repository.create({
      name: nameInput.value,
      description: descriptionInput.value,
    } as IProjectCreateRequest);
    if (!result) {
      console.error("failed to create entity");
      return;
    }
    alert("Project created successfully");
    return;
  };

  #applyCreateEventListeners = () => {
    console.log(document.querySelector<HTMLButtonElement>("#project-create"));
    document
      .querySelector<HTMLButtonElement>("#project-create")!
      .addEventListener("click", () => {
        this.#handleProjectCreate();
      });
  };
}

export default ProjectElement;
