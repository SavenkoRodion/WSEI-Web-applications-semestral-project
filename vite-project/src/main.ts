import Layout from "./Components/Layout/Layout";
import ProjectCreate from "./Components/Project/projectCreate";
import ProjectList from "./Components/Project/projectList";
import Navigation from "./Framework-core/Navigation/Navigation";
import Render from "./Framework-core/Render/Render";
import "./style.css";

const navigationInstance = Navigation.getInstance();
navigationInstance.addPathToComponentMapping(
  new Layout(new ProjectCreate()),
  "/project/create",
  "redirect-project-create"
);
navigationInstance.addPathToComponentMapping(
  new Layout(new ProjectList()),
  "/",
  "redirect-home"
);
Render.render();
