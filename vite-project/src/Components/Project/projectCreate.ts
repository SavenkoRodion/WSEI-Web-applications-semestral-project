import IComponentWrapper from "../../Framework-core/Model/IComponentWrapper";
import TComponent from "../../Framework-core/Model/TComponent";
import ProjectObject from "../../Model/projectObject";

//this should implement interface with one method: getComponent, other methods should be private

class ProjectCreate implements IComponentWrapper {
  #result: string;
  #afterRender: Array<() => any>;

  public constructor() {
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
  }

  public getComponent = (): TComponent => {
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

    const projectList: Array<any> = JSON.parse(
      localStorage.getItem("projectList") ?? "[]"
    );
    projectList.push(
      new ProjectObject(nameInput!.value, descriptionInput!.value)
    );
    localStorage.setItem("projectList", JSON.stringify(projectList));

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
