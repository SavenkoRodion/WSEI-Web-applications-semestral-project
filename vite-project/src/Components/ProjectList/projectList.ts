const getProjectList = () => {
  let result = "<div><h1>Project list</h1></div>";
  const projectList = localStorage.getItem("projectList");
  console.log(projectList);
  return result;
};

export default getProjectList;
