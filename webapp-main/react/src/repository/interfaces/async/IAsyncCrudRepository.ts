interface IAsyncCrudRepository<Request, Response> {
  create(object: Request): Promise<boolean>;
  getAll(): Promise<Response[]>;
  get(id: unknown): Promise<Response | null>;
  delete(id: unknown): Promise<boolean>;
  replace(object: Response): Promise<boolean>;
}

export default IAsyncCrudRepository;
