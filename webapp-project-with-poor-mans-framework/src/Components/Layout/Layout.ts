import IComponentWrapper from "../../Framework-core/Model/IComponentWrapper";
import TComponent from "../../Framework-core/Model/TComponent";

class Layout implements IComponentWrapper {
  #result: string = "";
  #afterRender: Array<() => any> = [];
  #innerComponent: IComponentWrapper;

  public constructor(innerComponent: IComponentWrapper) {
    this.#innerComponent = innerComponent;
  }

  public getComponent = (): TComponent => {
    const { result: innerComponentResult, afterRender: innerAfterRenderQueue } =
      this.#innerComponent.getComponent();
    this.#result = `
     <div>
      <nav>
         <a class="redirect-home">Home</a>
        <a class="redirect-project-create">Create</a>
      </nav>
      <div>
        ${innerComponentResult}
       </div>
     </div>
   `;

    this.#afterRender = this.#afterRender.concat(innerAfterRenderQueue);

    return {
      result: this.#result,
      afterRender: this.#afterRender,
    } as TComponent;
  };
}

export default Layout;
