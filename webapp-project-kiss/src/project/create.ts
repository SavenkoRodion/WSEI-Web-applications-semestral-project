import { Project } from "../model/project";
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
  localStorage.setItem(
    staticConfigs.localstorageProjectObjectVariable,
    JSON.stringify(projectObject)
  );
});
