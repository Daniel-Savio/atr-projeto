import { ApiRouteConfig, Handlers } from 'motia'
import { productSchema } from '../../../types'
import { db } from '../../../src/index'
import { productsTable } from '../../../src/db/schema'
import { z } from 'zod'

export const config: ApiRouteConfig = {
    name: 'GetAllProducts',
    type: 'api',
    path: '/products',
    method: 'GET',
    bodySchema: z.array(productSchema),
    flows: ['ProductManagement'],
    emits: ['ProductsFetched']
}

// The actual thing
export const handler: Handlers['GetAllProducts'] = async ({ logger }: any) => {
    const products = await db.select().from(productsTable)
    const productList = products.map(product => productSchema.parse(product))

    return { status: 200, body: productList.sort((a: any, b: any) => a.name.localeCompare(b.name)) }
}