import getProjectCreate from "../../Components/Project/projectCreate";
import getProjectList from "../../Components/Project/projectList";
import Render from "../Render/Render";

type pathToComponentMapping = {
  name: string;
  component: () => string;
  linkedPaths: Array<string>;
};

class Navigation {
  static pathToComponentMapping: Array<pathToComponentMapping> = [
    {
      name: "project list",
      component: getProjectList,
      linkedPaths: ["/", "/project/list", "/project/list/"],
    },
    {
      name: "project create",
      component: getProjectCreate,
      linkedPaths: ["/project/create", "/project/create/"],
    },
  ];

  static handleRedirectHome = () => {
    history.replaceState(null, "", "/");
    Render.render();
  };

  static handleRedirectProjectCreate = () => {
    history.replaceState(null, "", "/project/create/");
    Render.render();
  };

  static getContentByPath = (path: string) => {
    return (
      Navigation.pathToComponentMapping
        .filter((e) => e.linkedPaths.includes(path))[0]
        ?.component() ?? "<h1>404 Page Not Found</h1>"
    );
  };

  static applyNavigation = () => {
    document.querySelectorAll(".redirect-home").forEach((e) => {
      e.addEventListener("click", () => {
        Navigation.handleRedirectHome();
      });
    });
    document.querySelectorAll(".redirect-project-create").forEach((e) => {
      e.addEventListener("click", () => {
        Navigation.handleRedirectProjectCreate();
      });
    });
  };
}

export default Navigation;
