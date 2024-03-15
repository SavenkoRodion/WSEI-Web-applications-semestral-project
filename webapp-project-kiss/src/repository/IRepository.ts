interface IRepository<T> {
  create(object: T): boolean;
  getAll(): T[];
  delete(id: any): boolean;
  replace(object: T): boolean;
}

export default IRepository;
