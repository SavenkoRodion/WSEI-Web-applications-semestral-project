import { IUserService, UserService } from "../../service/UserService";

export default function authorize() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const userService: IUserService = new UserService();
      const loggedUser = userService.getLoggedUser();
      if (loggedUser) {
        const result = original.apply(this, args);
        return result;
      } else {
        alert("User is not authorized to perform this action!");
      }
    };
  };
}
