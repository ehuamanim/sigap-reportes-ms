export class HttpCommons {

  static response(statusCode: number, payload: any) {
    return {
      statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ payload }),
    };
  }

  static errorResponse(statusCode: number, error: string) {
    return {
      statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error }),
    };
  }
}
