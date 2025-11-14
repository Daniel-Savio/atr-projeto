import { ApiRouteConfig, Handlers } from 'motia'
import { productSchema } from '../../../types'
import { db } from '../../../src/index'
import { productsTable } from '../../../src/db/schema'


//Definig the config for motia
export const config: ApiRouteConfig = {
    name: 'CreateProduct',
    type: 'api',
    path: '/products',
    method: 'POST',
    bodySchema: productSchema.omit({ id: true }),
    flows: ['ProductManagement'],
    emits: ['ProductCreated']
}

// The actual thing
export const handler: Handlers['CreateProduct'] = async (req: any, { logger }: any) => {
    const product = productSchema.parse(req.body)
    const command = await db.insert(productsTable).values(product)
    logger.info('New Product', { OrderId: product.id })
    return { status: 201, body: { product, command } }
}