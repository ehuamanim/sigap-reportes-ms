// src/lambda.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { App } from './app';

const app = new App();
const userController = app.getUserController();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  
    try {
    const { httpMethod } = event;
    const path = event.path;

    let result;

    switch (`${httpMethod} ${path}`) {

      case 'GET /reportes/clientes/stats':
        result = await userController.getActiveClientesStats();
        break;
      default:
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ route: `${httpMethod} ${path}`, message: 'Route not found' }),
        };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        payload: result
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: error.name === 'ClienteNotFoundException' ? 404 : 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: error.message || 'Internal server error',
        error: error.name || 'UnknownError'
      }),
    };
  }
};