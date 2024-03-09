import Navigation from "../Navigation/Navigation";

class Render {
  static render = () => {
    const navigationInstance = Navigation.getInstance();
    const { result, afterRender } = navigationInstance
      .getComponentByPath(window.location.pathname)
      .getComponent();
    console.log(result);

    document.querySelector<HTMLDivElement>("#app")!.innerHTML = "";
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = result;

    navigationInstance.applyNavigation();
    afterRender.map((queuedFunction) => queuedFunction());
  };
}

export default Render;
