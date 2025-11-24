import { ApiRouteConfig, Handlers } from "motia";
import { db } from '../../../src/index';

export const config: ApiRouteConfig = {
    name: 'GetOrderById',
    type: 'api',
    path: '/orders/:id',
    method: 'GET',
    flows: ['OrderManagement'],
    emits: ['OrderByIdListed']
}

export const handler: Handlers['GetOrderById'] = async (req: any) => {
    const orderId = req.pathParams.id
    const order = await db.query.ordersTable.findFirst({
        where: (orders, { eq }) => eq(orders.id, orderId),
    });

    if (order) {
        return { status: 200, body: { message: 'Informaton found', order: order } }
    }
    else {
        return { status: 404, body: { message: 'No order found with this id' } }
    }
}