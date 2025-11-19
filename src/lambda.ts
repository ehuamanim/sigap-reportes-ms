import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { App } from './app';
import { HttpCommons } from './shared/commons';

const getClientIp = (event: APIGatewayProxyEvent): string =>
    event.headers['X-Forwarded-For']?.split(',')[0]?.trim() ||
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    event.requestContext.identity.sourceIp ||
    'unknown';

const getAuthContext = (event: APIGatewayProxyEvent) => ({
    userId: event.requestContext.authorizer?.userId || '',
    nickname: event.requestContext.authorizer?.nickname || '',
    role: event.requestContext.authorizer?.role || '',
    clientIp: getClientIp(event)
});

const app = new App();
const controller = app.getReportePolizaController();

const routes = {
  'POST /reporte/poliza/stats': (event: APIGatewayProxyEvent) => controller.getReportePolizaStats( JSON.parse(event.body || '{}') ),
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const {httpMethod, path} = event;
        const routeKey = `${httpMethod} ${path}`;

        // Inyectar contexto
        const authContext = getAuthContext(event);
        controller.setRequestContext(authContext);

        let routeHandler = routes[routeKey];

        if (!routeHandler) {
            return HttpCommons.errorResponse(404, 'Route not found');
        }

        const result = await routeHandler(event);
        return HttpCommons.response(200, result);
    } catch (error) {
        console.error(error);
        return HttpCommons.errorResponse(500, 'Internal server error');
    }
};