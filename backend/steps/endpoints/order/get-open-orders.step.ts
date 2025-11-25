import { ApiRouteConfig, Handlers } from "motia";
import { string, z } from "zod";
import { db } from '../../../src/index';
import { ordersTable } from "../../../src/db/schema";
import { eq } from "drizzle-orm";


export const config: ApiRouteConfig = {
    name: 'GetOpenOrders',
    type: 'api',
    path: '/opened/orders/',
    method: 'GET',
    bodySchema: z.object({ string: string().min(1) }),
    flows: ['OrderManagement'],
    emits: ['OpenOrdersListed']
}

export const handler: Handlers['GetOpenOrders'] = async (req: any, { logger }: any) => {
    const ordersList = await db.select().from(ordersTable).where(eq(ordersTable.status, "Open"))
    logger.info('Get Order', { OrderNumber: ordersList })
    if (ordersList.length === 0) {
        return { status: 404, body: { message: 'No orders found' } }
    } else {
        return { status: 200, body: { message: 'Informaton found', orders: ordersList } }
    }
}