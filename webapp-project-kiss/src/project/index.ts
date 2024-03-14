import { Project } from "../model/project";
import IRepository from "../repository/IRepository";
import ProjectRepository from "../repository/ProjectRepository";

const getProjectListElement = (
  id: string,
  name: string,
  description: string
) => {
  return `
  <div>
    <p>Project id: ${id}</p>
    <p>Project name: ${name}</p>
    <p>Project description: ${description}</p>
    <div>
      <button id="project-delete-${id}" class="project-delete-js">Delete</button>
      <button>Edit</button>
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

[...document.querySelectorAll(".project-delete-js")].map((e) =>
  e.addEventListener("click", () => {
    const response = repository.delete(e.id.replace("project-delete-", ""));
    if (response) location.reload();
    else alert("failed to remove project");
  })
);
