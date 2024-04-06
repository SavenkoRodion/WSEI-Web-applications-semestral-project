import { Project, SelectedProject } from "../model/project";
import IRepository from "../repository/IRepository";
import ProjectRepository from "../repository/ProjectRepository";
import SelectedProjectRepository from "../repository/SelectedProjectRepository";
import authorize from "../util/decorators/authorize";

class ProjectPage {
  #projectRepository: IRepository<Project>;
  #selectedProjectRepository: IRepository<SelectedProject>;
  #projects: Project[];
  #domProjectWrapper: HTMLDivElement;

  constructor() {
    this.#projectRepository = new ProjectRepository();
    this.#projects = this.#projectRepository.getAll();
    this.#domProjectWrapper = document.querySelector<HTMLDivElement>(
      "#project-list-container"
    )!;

    this.#selectedProjectRepository = new SelectedProjectRepository();
  }

  #getProjectListElement = (id: string, name: string, description: string) => {
    const lol = document.createElement("div");
    lol.innerHTML = name
    debugger
    return `
    <div data-display-row="${id}">
      <p>Project id: ${id}</p>
      <p>Project name: <span data-display-name="${lol.textContent}">${lol.textContent}</span></p>
      <p>Project description: <span data-display-description="${description}">${description}</span></p>
      <div>
        <button data-select-guid="${id}" class="project-select-js">Select</button>
        <button data-delete-guid="${id}" class="project-delete-js">Delete</button>
        <button data-edit-guid="${id}" class="project-edit-js">Edit</button>
      </div>
    </div>
    <hr />`;
  };

  #applySelectButtonEvents = () => {
    [...document.querySelectorAll<HTMLButtonElement>(".project-select-js")].map(
      (e) =>
        e.addEventListener("click", () => {
          this.#selectButtonEvent(e);
        })
    );
  };

  #applyDeleteButtonEvents = () => {
    [...document.querySelectorAll<HTMLElement>(".project-delete-js")].map((e) =>
      e.addEventListener("click", () => {
        const isSuccess = this.#projectRepository.delete(
          e.dataset["deleteGuid"] ?? ""
        );
        if (isSuccess) location.reload();
        else alert("failed to remove project");
      })
    );
  };

  #applyEditButtonEvents = () => {
    [...document.querySelectorAll<HTMLButtonElement>(".project-edit-js")].map(
      (e) =>
        e.addEventListener("click", () => {
          this.#editButtonEvent(e);
        })
    );
  };

  #editButtonEvent = (e: HTMLButtonElement) => {
    const { editGuid } = e.dataset;
    if (!editGuid) return;

    const btnParentNode = e.parentNode as HTMLElement;
    if (!btnParentNode) return;

    const btnSave = document.createElement("button");
    btnSave.textContent = "Save";
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    const nameInput = document.createElement("input");
    const descriptionInput = document.createElement("input");

    const projectName = document.querySelector<HTMLElement>(
      `[data-display-row="${editGuid}"] > p > [data-display-name]`
    );
    const projectDescription = document.querySelector<HTMLElement>(
      `[data-display-row="${editGuid}"] > p > [data-display-description]`
    );

    if (!projectName || !projectDescription) return;

    nameInput.value = projectName.innerHTML.trim();
    descriptionInput.value = projectDescription.innerHTML.trim();

    const cancelHandler = () => {
      btnParentNode.removeChild(btnSave);
      btnParentNode.removeChild(btnCancel);
      btnParentNode.appendChild(e);
      nameInput.parentNode?.appendChild(projectName);
      descriptionInput.parentNode?.appendChild(projectDescription);
      projectName.parentNode?.removeChild(nameInput);
      descriptionInput.parentNode?.removeChild(descriptionInput);
    };

    const saveHandler = () => {
      const thisProject = this.#projectRepository
        .getAll()
        .find((x) => x.id === editGuid);
      if (!thisProject) return;

      const trimmedName = nameInput.value.trim();
      const trimmedDescription = descriptionInput.value.trim();

      thisProject.name = trimmedName;
      thisProject.description = trimmedDescription;
      projectName.textContent = trimmedName;
      projectDescription.textContent = trimmedDescription;

      this.#projectRepository.replace(thisProject);
      location.reload();
    };

    btnCancel.addEventListener("click", cancelHandler);
    btnSave.addEventListener("click", saveHandler);

    btnParentNode.appendChild(btnSave);
    btnParentNode.appendChild(btnCancel);
    btnParentNode.removeChild(e);
    projectName.parentNode?.appendChild(nameInput);
    projectDescription.parentNode?.appendChild(descriptionInput);
    projectName.parentNode?.removeChild(projectName);
    projectDescription.parentNode?.removeChild(projectDescription);
  };

  #loadSelectedProject = () => {
    const selectedProject = this.#selectedProjectRepository.getAll();
    if (selectedProject.length === 1) {
      const selectedProjectButton = document.querySelector<HTMLButtonElement>(
        `[data-select-guid="${selectedProject[0].id}"]`
      );
      if (selectedProjectButton) {
        selectedProjectButton.textContent = "SELECTED";
        const navLink = document.querySelector<HTMLLinkElement>(
          "#nav-selected-project"
        );
        if (!navLink) return;
        navLink.href = "/";
        const thisProjectTMP = this.#projectRepository
        .getAll()
        .filter(
          (e) => (e.id === selectedProject[0].id)
        );
        navLink.textContent = `Selected project: ${thisProjectTMP[0].name}`;
      } else alert("Can't find selected project");
    }
  };

  #selectButtonEvent = (e: HTMLButtonElement) => {
    if (!e.dataset["selectGuid"]) return;
    const isSuccess = this.#selectedProjectRepository.create(
      new SelectedProject(e.dataset["selectGuid"])
    );
    if (isSuccess) location.reload();
    else alert("failed to select project");
  };

  @authorize()
  public run() {
    this.#domProjectWrapper.innerHTML = this.#projects
      .map((e) => this.#getProjectListElement(e.id, e.name, e.description))
      .join("");
    this.#applySelectButtonEvents();
    this.#applyDeleteButtonEvents();
    this.#applyEditButtonEvents();
    this.#loadSelectedProject();
  }
}

const main = new ProjectPage();
main.run();
