import TComponent from "./TComponent";

interface IComponentWrapper {
  getComponent: () => TComponent;
}

export default IComponentWrapper;
