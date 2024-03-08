import IComponentWrapper from "../../Framework-core/Model/IComponentWrapper";
import TComponent from "../../Framework-core/Model/TComponent";

class ProjectList implements IComponentWrapper {
  #result: string;
  #afterRender: Array<() => any> = [];

  public constructor() {
    this.#result = "<div><h1>Project list</h1></div>";
    this.#afterRender = [];
  }

  public getComponent = (): TComponent => {
    return {
      result: this.#result,
      afterRender: this.#afterRender,
    } as TComponent;
  };
}

export default ProjectList;
