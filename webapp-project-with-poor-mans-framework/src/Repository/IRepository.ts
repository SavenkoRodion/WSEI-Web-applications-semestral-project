import { IRepositoryCreateRequest } from "../Model/interfaces";

export default interface IRepository<T> {
  getAll(): Array<T> | null;
  create(object: IRepositoryCreateRequest): boolean;
  delete(id: any): boolean;
}
