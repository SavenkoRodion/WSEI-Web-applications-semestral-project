import combineWithLayout from "../../Components/Layout/Layout";
import Navigation from "../Navigation/Navigation";

class Render {
  static render = () => {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = "";
    document.querySelector<HTMLDivElement>("#app")!.innerHTML =
      combineWithLayout(Navigation.getContentByPath(window.location.pathname));
    Navigation.applyNavigation();
  };
}

export default Render;
