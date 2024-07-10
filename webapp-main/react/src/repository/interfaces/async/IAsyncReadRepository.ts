interface IAsyncReadRepository<T> {
  getAll(): Promise<T[]>;
  get(id: unknown): Promise<T | null>;
}

export default IAsyncReadRepository;
