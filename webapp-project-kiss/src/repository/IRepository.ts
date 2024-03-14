interface IRepository<T> {
  create(object: T): boolean;
  getAll(): T[];
  delete(id: any): boolean;
}

export default IRepository;
