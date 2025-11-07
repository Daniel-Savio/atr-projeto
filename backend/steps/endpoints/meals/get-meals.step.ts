import { ApiRouteConfig, Handlers } from 'motia'
import { mealSchema } from '../../../types'
import { db } from '../../../src/index'
import { mealsTable } from '../../../src/db/schema'
import { z } from 'zod'

export const config: ApiRouteConfig = {
    name: 'GetMeals',
    type: 'api',
    path: '/meals',
    method: 'GET',
    bodySchema: z.array(mealSchema),
    flows: ['MealManagement'],
    emits: ['MealsFetched']
}

export const handler: Handlers['GetMeals'] = async ({ logger }: any) => {
    const meals = await db.select().from(mealsTable)
    const mealsList = meals.map(meal => mealSchema.parse(meal))

    return { status: 200, body: mealsList.sort((a: any, b: any) => a.price.localeCompare(b.price)) }
}