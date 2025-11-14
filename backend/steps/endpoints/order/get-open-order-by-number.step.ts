import { ApiRouteConfig, Handlers } from "motia";
import { db } from '../../../src/index';
import { ordersTable } from "../../../src/db/schema";
import { eq, and } from "drizzle-orm";
import { string, z } from "zod";


export const config: ApiRouteConfig = {
    name: 'GetOpenOrderByNumber',
    type: 'api',
    path: '/orders/open/:number',
    method: 'GET',
    bodySchema: z.object({ string: string().min(1) }),
    flows: ['OrderManagement'],
    emits: ['OrderNumberListed']
}

export const handler: Handlers['GetOpenOrderByNumber'] = async (req: any) => {
    const orderNumber = req.pathParams.number
    const order = await db.select().from(ordersTable)
        .where(and(
            eq(ordersTable.number, orderNumber),
            eq(ordersTable.status, "Open")))

    console.log(order)
    if (order.length > 0) {
        return { status: 200, body: { message: 'Comanda aberta encontrada', order: order[0] } }
    }
    else {
        return { status: 404, body: { message: 'Nehuma comanda foi aberta com este número' } }
    }


}