export class ReqFilterDto {
  desde?: string | null;
  hasta?: string | null;

  constructor(desde?: string | null, hasta?: string | null) {
    this.desde = desde || null;
    this.hasta = hasta || null;
  }
}