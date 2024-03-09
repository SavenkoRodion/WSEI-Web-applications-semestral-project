import IComponentWrapper from "../Model/IComponentWrapper";
import Render from "../Render/Render";

type pathToComponentMapping = {
  component: IComponentWrapper;
  linkedPath: string;
  cssNavigationClass: string;
};

//404 not found

class Navigation {
  private static instance: Navigation;
  private pathToComponentMapping: Array<pathToComponentMapping> = [];
  private constructor() {}

  public static getInstance(): Navigation {
    if (!Navigation.instance) {
      Navigation.instance = new Navigation();
    }

    return Navigation.instance;
  }

  public addPathToComponentMapping = (
    component: IComponentWrapper,
    path: string,
    cssNavigationClass: string
  ): void => {
    this.pathToComponentMapping.push({
      component: component,
      linkedPath: path,
      cssNavigationClass: cssNavigationClass,
    });
  };

  public getComponentByPath = (path: string): IComponentWrapper => {
    return (
      this.pathToComponentMapping.filter((e) => e.linkedPath === path)[0]
        ?.component ?? "<h1>404 Page Not Found</h1>"
    );
  };

  private handleRedirect = (path: string, cssNavigationClass: string) => {
    document.querySelectorAll(`.${cssNavigationClass}`).forEach((e) => {
      e.addEventListener("click", () => {
        history.replaceState(null, "", path);
        Render.render();
      });
    });
  };

  public applyNavigation = () => {
    this.pathToComponentMapping.map((e) =>
      this.handleRedirect(e.linkedPath, e.cssNavigationClass)
    );
  };
}

export default Navigation;
