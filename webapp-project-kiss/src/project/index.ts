import { Project } from "../model/project";
import IRepository from "../repository/IRepository";
import ProjectRepository from "../repository/ProjectRepository";

const getProjectListElement = (
  id: string,
  name: string,
  description: string
) => {
  return `
  <div data-display-row="${id}">
    <p>Project id: ${id}</p>
    <p>Project name: <span data-display-name="${name}">${name}</span></p>
    <p>Project description: <span data-display-description="${description}">${description}</span></p>
    <div>
      <button data-delete-guid="${id}" class="project-delete-js">Delete</button>
      <button data-edit-guid="${id}" class="project-edit-js">Edit</button>
    </div>
  </div>
  <hr />`;
};

const repository: IRepository<Project> = new ProjectRepository();
const projects = repository.getAll();
const domProjectWrapper = document.querySelector<HTMLDivElement>(
  "#project-list-container"
);

domProjectWrapper!.innerHTML = projects
  .map((e) => getProjectListElement(e.id, e.name, e.description))
  .join("");

[...document.querySelectorAll<HTMLElement>(".project-delete-js")].map((e) =>
  e.addEventListener("click", () => {
    const response = repository.delete(e.dataset["delete-guid"] ?? "");
    if (response) location.reload();
    else alert("failed to remove project");
  })
);

[...document.querySelectorAll<HTMLElement>(".project-edit-js")].map((e) =>
  e.addEventListener("click", () => {
    editButtonEvent(e);
  })
);

function editButtonEvent(e: HTMLElement) {
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
    parentNode.appendChild(e);
  });
  btnSave.addEventListener("click", () => {
    const thisProject = repository
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
    //location.reload();
  });
  parentNode.appendChild(btnSave);
  parentNode.appendChild(btnCancel);
  projectName!.parentNode!.appendChild(nameInput!);
  projectDescription!.parentNode!.appendChild(descriptionInput!);
  parentNode.removeChild(e);
  projectName!.parentNode!.removeChild(projectName!);
  projectDescription!.parentNode!.removeChild(projectDescription!);
}
