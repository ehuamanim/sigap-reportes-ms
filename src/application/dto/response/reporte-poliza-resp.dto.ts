export class ReportePolizaRespDto {

  constructor(
    public readonly total: number,
    public readonly nuevas: number,
    public readonly porVencer: number,
    public readonly vencidas: number,
    public readonly anuladas: number,
  ) {}
}