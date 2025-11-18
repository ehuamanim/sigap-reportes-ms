export class ReportePolizaRespDto {

  constructor(
    public readonly vigente: number,
    public readonly vencido: number,
    public readonly anulado: number,
    public readonly total: number,
    public readonly porVencer: number,
    public readonly nueva: number,
  ) {}

}