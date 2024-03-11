import { Project } from "../model/project";
import ProjectRepository from "../repository/ProjectRepository";
import staticConfigs from "../staticConfigs";

console.log("lol");
const btnSave = document.querySelector("#project-save");
const inputName = document.querySelector<HTMLInputElement>("#project-name");
const inputDesc = document.querySelector<HTMLInputElement>(
  "#project-description"
);

btnSave?.addEventListener("click", () => {
  if (!inputName?.value) {
    return;
  }
  if (!inputDesc?.value) {
    return;
  }
  const projectObject = new Project({
    name: inputName.value,
    description: inputDesc.value,
  });
  const repository: IRepository<Project> = new ProjectRepository();
  const result = repository.create(projectObject);
  if (result) alert("Project created successfully");
  else alert("Failed to create a project");
  console.log(repository.getAll());
});
