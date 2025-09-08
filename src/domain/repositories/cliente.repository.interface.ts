export interface IClienteRepository {
  countActiveUsers(): Promise<number>;
}