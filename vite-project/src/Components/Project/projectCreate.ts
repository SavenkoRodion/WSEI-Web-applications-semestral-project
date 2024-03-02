const projectSave = () => {
  const name = document.querySelector("#project-name");
  const description = document.querySelector("#project-description");
  const projectList: Array<any> = JSON.parse(
    localStorage.getItem("projectList") ?? "[]"
  );
  projectList.push({});
  localStorage.setItem("projectList", JSON.stringify(projectList));
};
