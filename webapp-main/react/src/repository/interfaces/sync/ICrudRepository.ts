interface ICrudRepository<T> {
  create(object: T): boolean;
  getAll(): T[];
  delete(id: unknown): boolean;
  replace(object: T): boolean;
}

export default ICrudRepository;
