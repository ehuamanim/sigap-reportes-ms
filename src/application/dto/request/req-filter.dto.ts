export class ReqFilterDto {
  filter: string;
  desde?: string | null;
  hasta?: string | null;

  constructor(filter: string, desde?: string | null, hasta?: string | null) {
    this.filter = filter;
    this.desde = desde || null;
    this.hasta = hasta || null;
  }
}