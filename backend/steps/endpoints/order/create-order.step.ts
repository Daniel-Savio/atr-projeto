import { ApiRouteConfig, Handlers } from 'motia'
import { orderSchema } from '../../../types'
import { db } from '../../../src/index'
import { ordersTable } from '../../../src/db/schema'

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
    const order = orderSchema.omit({ id: true }).parse(req.body)
    const date = new Date().toISOString()
    const total = order.meals.reduce((acc, meal) => acc + parseFloat(meal.price), 0) + (order.otherItems ? order.otherItems.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0)

    order.date = date
    order.otherItems = order.otherItems || []
    order.total = total.toFixed(2)

    db.insert(ordersTable).values({ ...order, date, total: order.total })

    return { status: 201, body: order }
}