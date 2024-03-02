import "./style.css";
import getProjectList from "./Components/ProjectList/projectList.ts";

const projectList = getProjectList();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <nav>
      <a href="../public/create/">Create</a>
    </nav>
    ${projectList}
  </div>
`;
