interface IAsyncCrudRepository<Request, Response> {
  create(object: Request): Promise<boolean>;
  getAll(): Promise<Response[]>;
  delete(id: unknown): Promise<boolean>;
  replace(object: Request): Promise<boolean>;
}

export default IAsyncCrudRepository;
