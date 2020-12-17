export interface IDatabase {
  insert(query: string): Promise<any>;
  getOne(id: string): Promise<any>;
  getAll(query: string): Promise<any[]>;
  deleteOne(id: string): Promise<any>;
}
