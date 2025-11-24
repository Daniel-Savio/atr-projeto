import { ApiRouteConfig, Handlers } from 'motia'
import { orderSchema } from '../../../types'
import { db } from '../../../src/index'
import { ordersTable } from '../../../src/db/schema'
import { and, eq } from 'drizzle-orm'

export const config: ApiRouteConfig = {
    name: 'CreateOrder',
    type: 'api',
    path: '/orders',
    method: 'POST',
    bodySchema: orderSchema.omit({ id: true, date: true, total: true }),
    flows: ['OrderManagement'],
    emits: ['OrderCreated']
}

export const handler: Handlers['CreateOrder'] = async (req: any) => {
    const order = orderSchema.parse(req.body)
    const date = new Date().toISOString()
    const total = order.meals.reduce((acc, meal) => acc + parseFloat(meal.price), 0) + (order.otherItems ? order.otherItems.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0)


    order.otherItems = order.otherItems || []
    order.total = total.toFixed(2)
    console.log(order)
    const openedOrder = await db.select().from(ordersTable).where(and(eq(ordersTable.number, order.number), eq(ordersTable.status, "Open")))


    if (!openedOrder.length) {
        const dbOrder = await db.insert(ordersTable).values({ ...order, date: date, total: order.total, status: order.status })
        if (!dbOrder) {
            return { status: 500, body: { message: 'Error creating order' } }
        }
        else {
            return { status: 201, body: order }
        }

    } else if (openedOrder.length === 1) {
        await db.update(ordersTable)
            .set({ number: order.number, meals: order.meals, otherItems: order.otherItems, date: date, total: order.total, status: order.status })
            .where(eq(ordersTable.id, openedOrder[0].id))
        return { status: 203, body: { message: `Updated order ${order.number}` } }
    }

    else {
        return { status: 500, body: { message: 'WTF' } }
    }
}