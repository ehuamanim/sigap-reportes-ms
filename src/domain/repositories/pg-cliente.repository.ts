// src/infrastructure/repositories/postgres-user.repository.ts
import { Pool } from 'pg';
import { IClienteRepository } from './cliente.repository.interface';

export class PgClienteRepository implements IClienteRepository {
  constructor(private readonly pool: Pool) {}

  async countActiveClientes(): Promise<number> {
    const query = `select count(*) from poliza.cliente c where c.es_prospecto='C' AND c.estado = 'A'`;
    return this.getCountQuery( query );
  }

  async countActiveProspectos(): Promise<number> {
    const query = `select count(*) from poliza.cliente c where c.es_prospecto='P' AND c.estado = 'A'`;
    return this.getCountQuery( query );
  }
  
  private async getCountQuery( query: string ){
    const result = await this.pool.query(query);
    return parseInt(result.rows[0].count);
  }

}