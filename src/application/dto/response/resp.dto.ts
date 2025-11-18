export class RespDto<T> {
  public version: string = '1.0.0';
  public status: number;
  public message: string;
  public errorMessage: string;
  public time: string;
  public payload: T;

  constructor(
    payload: T,
    status: number = 200,
    message: string = 'Success',
    errorMessage: string = '',
    time: string = new Date().toISOString(),
  ) {
    this.payload = payload;
    this.status = status;
    this.message = message;
    this.errorMessage = errorMessage;
    this.time = time;
  }

  // Static factory methods for common responses
  static success<T>(payload: T, message: string = 'Success'): RespDto<T> {
    return new RespDto(payload, 200, message);
  }

  static error<T>(payload: T, errorMessage: string, status: number = 500): RespDto<T> {
    return new RespDto(payload, status, 'Error', errorMessage);
  }

  static notFound<T>(payload: T, message: string = 'Not found'): RespDto<T> {
    return new RespDto(payload, 404, message);
  }

  static badRequest<T>(payload: T, errorMessage: string): RespDto<T> {
    return new RespDto(payload, 400, 'Bad Request', errorMessage);
  }
}