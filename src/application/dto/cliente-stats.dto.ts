export class ClienteStatsDto {
  totalActiveUsers: number;
  timestamp: Date;

  constructor(totalActiveUsers: number) {
    this.totalActiveUsers = totalActiveUsers;
    this.timestamp = new Date();
  }
}