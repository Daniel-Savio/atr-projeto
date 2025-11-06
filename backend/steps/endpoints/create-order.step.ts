import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

// Just creating the type
const createOrderScheema = z.object({
    id: z.string().min(1),
    number: z.string().min(1),
    meals: z.array(z.enum(['a-vontade', 'rodizio', 'por-quilo'])),
    beveareges: z.array(z.enum(['refrigerante', 'suco-natural', 'agua', 'suco'])),
    deserts: z.array(z.enum(['pudim', 'mousse', 'sorvete'])),

})

//Definig the config for motia
export const config: ApiRouteConfig = {
    name: 'CreateOrder',
    type: 'api',
    path: '/orders',
    method: 'POST',
    bodySchema: createOrderScheema,
    flows: ['OrderManagement'],
    emits: ['OrderCreated']
}

// The actual thing
export const handler: Handlers['CreateOrder'] = async (req, { logger }) => {
    const data = createOrderScheema.parse(req.body)
    logger.info('New Order', { OrderId: data.id })
    return { status: 201, body: data }
}