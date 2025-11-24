import { ApiRouteConfig, Handlers } from "motia";
import { db } from '../../../src/index';
import { ordersTable } from "../../../src/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const config: ApiRouteConfig = {
    name: 'CloseOrder',
    type: 'api',
    path: '/orders/close/:id',
    method: 'PATCH',
    flows: ['OrderManagement'],
    emits: ['OrderClosed']
}

export const handler: Handlers['CloseOrder'] = async (req: any) => {
    const orderId = req.pathParams.id;

    try {
        const [updatedOrder] = await db.update(ordersTable)
            .set({ status: 'Closed' })
            .where(eq(ordersTable.id, orderId))
            .returning();

        if (updatedOrder) {
            return { status: 200, body: { message: `Order ${orderId} successfully closed`, order: updatedOrder } };
        } else {
            return { status: 404, body: { message: `Order with ID ${orderId} not found` } };
        }
    } catch (error) {
        console.error("Error closing order:", error);
        return { status: 500, body: { message: 'Failed to close order due to an internal server error' } };
    }
}