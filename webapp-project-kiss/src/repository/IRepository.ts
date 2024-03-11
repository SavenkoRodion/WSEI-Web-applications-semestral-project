interface IRepository<T> {
  create(object: T): boolean;
  getAll(): T[];
}
