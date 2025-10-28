export interface IClienteRepository {
  countActiveClientes(): Promise<number>;
  countActiveProspectos(): Promise<number>;
}