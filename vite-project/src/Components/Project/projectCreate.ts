import IComponentWrapper from "../../Framework-core/Model/IComponentWrapper";
import TComponent from "../../Framework-core/Model/TComponent";
import {
  IProjectCreateRequest,
  ProjectObject,
} from "../../Model/projectObject";
import IRepository from "../../Repository/IRepository";

//this should implement interface with one method: getComponent, other methods should be private

class ProjectCreate implements IComponentWrapper {
  #result: string = "";
  #afterRender: Array<() => any> = [];
  #repository: IRepository<ProjectObject>;

  public constructor(projectRepository: IRepository<ProjectObject>) {
    this.#repository = projectRepository;
  }

  public getComponent = (): TComponent => {
    this.#result = `
    <div>
      <h1>Create project</h1>
      <br />
      <label for="project-name">Project name: </label>
      <input id="project-name" required /><br /><br />
      <label for="project-description">Project description: </label>
      <input id="project-description" required /><br /><br />
      <button id="project-create">Create</button>
    </div>`;

    this.#afterRender = [this.#applyCreateEventListener];
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
    if (!result) console.error("failed to create entity");

    return;
  };

  #applyCreateEventListener = () => {
    console.log(document.querySelector<HTMLButtonElement>("#project-create"));
    document
      .querySelector<HTMLButtonElement>("#project-create")!
      .addEventListener("click", () => {
        this.#handleProjectCreate();
      });
  };
}

export default ProjectCreate;
