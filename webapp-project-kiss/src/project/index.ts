import { Project, SelectedProject } from "../model/Project";
import IRepository from "../repository/IRepository";
import ProjectRepository from "../repository/ProjectRepository";
import SelectedProjectRepository from "../repository/SelectedProjectRepository";
import authorize from "../util/decorators/authorize";

class ProjectPage {
  #projectRepository: IRepository<Project>;
  #selectedProjectRepository: IRepository<SelectedProject>;
  #projects: Project[];
  #domProjectWrapper: HTMLDivElement | null;

  constructor() {
    this.#projectRepository = new ProjectRepository();
    this.#projects = this.#projectRepository.getAll();
    this.#domProjectWrapper = document.querySelector<HTMLDivElement>(
      "#project-list-container"
    );

    this.#selectedProjectRepository = new SelectedProjectRepository();
  }

  #getProjectListElement = (id: string, name: string, description: string) => {
    return `
    <div data-display-row="${id}">
      <p>Project id: ${id}</p>
      <p>Project name: <span data-display-name="${name}">${name}</span></p>
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
    [...document.querySelectorAll<HTMLElement>(".project-edit-js")].map((e) =>
      e.addEventListener("click", () => {
        this.#editButtonEvent(e);
      })
    );
  };

  #editButtonEvent = (e: HTMLElement) => {
    //refactor this mess
    const parentNode = e.parentNode!;

    const btnSave = document.createElement("button");
    btnSave.innerHTML = "Save";
    const btnCancel = document.createElement("button");
    btnCancel.innerHTML = "Cancel";
    const nameInput = document.createElement("input");
    const descriptionInput = document.createElement("input");
    const projectName = document.querySelector(
      `[data-display-row="${e.dataset["editGuid"]}"] > p > [data-display-name]`
    );
    const projectDescription = document.querySelector(
      `[data-display-row="${e.dataset["editGuid"]}"] > p > [data-display-description]`
    );
    nameInput.value = projectName?.innerHTML ?? "";
    descriptionInput.value = projectDescription?.innerHTML ?? "";

    btnCancel.addEventListener("click", () => {
      parentNode.removeChild(btnSave);
      parentNode.removeChild(btnCancel);
      nameInput!.parentNode!.appendChild(projectName!);
      descriptionInput!.parentNode!.appendChild(projectDescription!);
      nameInput!.parentNode!.removeChild(nameInput!);
      descriptionInput!.parentNode!.removeChild(descriptionInput!);
      parentNode.appendChild(e); //
    });
    btnSave.addEventListener("click", () => {
      const thisProject = this.#projectRepository
        .getAll()
        .find((x) => x.id === e.dataset["editGuid"]);
      if (!thisProject) return;
      thisProject.name = nameInput.value.trim();
      thisProject.description = descriptionInput.value.trim();
      projectName!.textContent = nameInput.value.trim();
      projectDescription!.textContent = descriptionInput.value.trim();
      nameInput!.parentNode!.appendChild(projectName!);
      descriptionInput!.parentNode!.appendChild(projectDescription!);
      nameInput!.parentNode!.removeChild(nameInput!);
      descriptionInput!.parentNode!.removeChild(descriptionInput!);
      parentNode.removeChild(btnSave);
      parentNode.removeChild(btnCancel);
      parentNode.appendChild(e);
      this.#projectRepository.replace(thisProject);
      //location.reload();
    });
    parentNode.appendChild(btnSave);
    parentNode.appendChild(btnCancel);
    projectName!.parentNode!.appendChild(nameInput!);
    projectDescription!.parentNode!.appendChild(descriptionInput!);
    parentNode.removeChild(e);
    projectName!.parentNode!.removeChild(projectName!);
    projectDescription!.parentNode!.removeChild(projectDescription!);
  };

  #loadSelectedProject = () => {
    const selectedProject = this.#selectedProjectRepository.getAll();
    console.log(typeof selectedProject);
    if (selectedProject.length === 1) {
      const selectedProjectButton = document.querySelector<HTMLButtonElement>(
        `[data-select-guid="${selectedProject[0].id}"]`
      );
      if (selectedProjectButton) {
        selectedProjectButton.innerHTML = "SELECTED";
        const navLink = document.querySelector<HTMLLinkElement>(
          "#nav-selected-project"
        );
        console.log(navLink);
        if (!navLink) return;
        navLink.href = "/";
        const allProjects = this.#projectRepository.getAll();
        const thisProjectTMP = allProjects.filter(
          (e) => (e.id = selectedProject[0].id)
        );
        navLink.innerHTML = `Selected project: ${thisProjectTMP[0].name}`;
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
    this.#domProjectWrapper!.innerHTML = this.#projects
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
