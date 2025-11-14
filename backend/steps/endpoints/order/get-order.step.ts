import { ApiRouteConfig, Handlers } from "motia";
import { string, z } from "zod";
import { db } from '../../../src/index';
import { ordersTable } from "../../../src/db/schema";
import { or } from "drizzle-orm";


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
    const ordersList = await db.select().from(ordersTable)
    logger.info('Get Order', { OrderNumber: ordersList })
    if (ordersList.length === 0) {
        return { status: 404, body: { message: 'No orders found' } }
    } else {
        return { status: 200, body: { message: 'Informaton found', orders: ordersList } }
    }
}