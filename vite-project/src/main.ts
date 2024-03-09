import Layout from "./Components/Layout/Layout";
import ProjectCreate from "./Components/Project/projectCreate";
import ProjectList from "./Components/Project/projectList";
import Navigation from "./Framework-core/Navigation/Navigation";
import Render from "./Framework-core/Render/Render";
import ProjectObject from "./Model/projectObject";
import ProjectRepository from "./Repository/Project";
import "./style.css";

const navigationInstance = Navigation.getInstance();

const projectRepository: IRepository<ProjectObject> = new ProjectRepository();

navigationInstance.addPathToComponentMapping(
  new Layout(new ProjectCreate(projectRepository)),
  "/project/create",
  "redirect-project-create"
);
navigationInstance.addPathToComponentMapping(
  new Layout(new ProjectList(projectRepository)),
  "/",
  "redirect-home"
);

Render.render();
