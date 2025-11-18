export class PolizaReporte {
    constructor(
        public readonly vigente: number = 0,
        public readonly vencido: number = 0,
        public readonly anulado: number = 0,
        public readonly total: number = 0,
    ) { }
}