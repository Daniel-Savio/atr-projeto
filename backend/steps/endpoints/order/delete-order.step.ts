import { ApiRouteConfig, Handlers } from "motia";
import { db } from '../../../src/index';
import { ordersTable } from "../../../src/db/schema";
import { eq } from "drizzle-orm";

export const config: ApiRouteConfig = {
    name: 'DeleteOrder',
    type: 'api',
    path: '/orders/:id',
    method: 'DELETE',
    flows: ['OrderManagement'],
    emits: ['OrderDeleted']
}

export const handler: Handlers['DeleteOrder'] = async (req: any) => {
    const orderId = req.pathParams.id;

    try {
        const [deletedOrder] = await db.delete(ordersTable)
            .where(eq(ordersTable.id, orderId))
            .returning();

        if (deletedOrder) {
            return { status: 200, body: { message: `Order ${orderId} successfully deleted`, order: deletedOrder } };
        } else {
            return { status: 404, body: { message: `Order with ID ${orderId} not found` } };
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        return { status: 500, body: { message: 'Failed to delete order due to an internal server error' } };
    }
}