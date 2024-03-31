import { IUserHandler, UserHandler } from "../../handlers/UserHandler";

export default function authorize() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const userHandler: IUserHandler = new UserHandler();
      const loggedUser = userHandler.getLoggedUser();
      if (loggedUser) {
        const result = original.apply(this, args);
        return result;
      } else {
        alert("User is not authorized to perform this action!");
      }
    };
  };
}
