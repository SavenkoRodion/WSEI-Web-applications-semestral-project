import "./style.css";
import getProjectList from "./Components/Project/projectList.ts";
import combineWithLayout from "./Components/Layout/Layout.ts";

const projectList = getProjectList();

const render = (outlet: string) => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML =
    combineWithLayout(outlet);
  useNavigation();
};

const useNavigation = () => {
  document.querySelectorAll(".redirect-home").forEach((e) => {
    e.addEventListener("click", () => {
      history.replaceState(null, "", "/");
    });
  });
  document.querySelectorAll(".redirect-project-create").forEach((e) => {
    e.addEventListener("click", () => {
      history.replaceState(null, "", "/project/create");
    });
  });
};

render(projectList);
