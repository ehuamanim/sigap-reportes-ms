// src/infrastructure/repositories/postgres-user.repository.ts
import { Pool } from 'pg';
import { IClienteRepository } from './cliente.repository.interface';

export class PgClienteRepository implements IClienteRepository {
  constructor(private readonly pool: Pool) {}

  async countActiveUsers(): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM users WHERE status = 'A'`;
    const result = await this.pool.query(query);
    return parseInt(result.rows[0].count);
  }

}