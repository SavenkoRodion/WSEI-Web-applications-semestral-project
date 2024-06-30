interface IAsyncCrudRepository<T> {
  create(object: T): Promise<boolean>;
  getAll(): Promise<T[]>;
  delete(id: unknown): Promise<boolean>;
  replace(object: T): Promise<boolean>;
}

export default IAsyncCrudRepository;
