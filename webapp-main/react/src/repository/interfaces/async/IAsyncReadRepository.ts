interface IAsyncReadRepository<T> {
  getAll(): Promise<T[]>;
}

export default IAsyncReadRepository;
