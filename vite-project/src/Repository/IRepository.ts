interface IRepository<T> {
  //getById(id: any): T;
  getAll(): Array<T> | null;
}
