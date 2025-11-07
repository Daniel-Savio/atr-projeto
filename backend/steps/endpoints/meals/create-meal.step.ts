import { ApiRouteConfig, Handlers } from 'motia'
import { mealSchema } from '../../../types'
import { db } from '../../../src/index'
import { mealsTable } from '../../../src/db/schema'


//Definig the config for motia
export const config: ApiRouteConfig = {
    name: 'CreateMeal',
    type: 'api',
    path: '/meals',
    method: 'POST',
    bodySchema: mealSchema.omit({ id: true }),
    flows: ['MealManagement'],
    emits: ['MealCreated']
}

export const handler: Handlers['CreateMeal'] = async (req: any, { logger }: any) => {
    const meal = mealSchema.parse(req.body)
    await db.insert(mealsTable).values(meal)
    logger.info('New Meal', { MealId: meal.id })
    return { status: 201, body: meal }
}