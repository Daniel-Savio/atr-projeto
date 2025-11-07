import { ApiRouteConfig, Handlers } from "motia";
import { string, z } from "zod";


export const config: ApiRouteConfig = {
    name: 'GetOrder',
    type: 'api',
    path: '/orders',
    method: 'GET',
    bodySchema: z.object({ string: string().min(1) }),
    flows: ['OrderManagement'],
    emits: ['OrderListed']
}

export const handler: Handlers['GetOrder'] = async (req: any, { logger }: any) => {

    logger.info('Get Order', { OrderNumber: "teste" })
    return { status: 200, body: { message: 'Get Order works!' } }
}