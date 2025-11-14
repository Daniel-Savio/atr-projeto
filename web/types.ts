import { z } from 'zod';

export const productTypeSchema = z.enum(['sobremesa', 'bebida-nao-alcolicas', 'bebidas-alcolicas']);
export const statusTypeSchema = z.enum(['Open', 'Closed', 'Cancelled']);
export const productSchema = z.object({
    id: z.string().optional(),
    type: productTypeSchema,
    name: z.string(),
    price: z.string(),
});

export const mealSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    price: z.string(),
    weekendPrice: z.string().optional(),
});

export const orderSchema = z.object({
    id: z.string().optional(),
    number: z.string(),
    date: z.string().optional(),
    status: statusTypeSchema.default('Open'),
    meals: z.array(mealSchema),
    otherItems: z.array(productSchema).optional(),
    total: z.string().optional(),
});

export const postOrderSchema = z.object({
    meals: z.array(mealSchema),
    otherItems: z.array(productSchema).optional(),
});

export type Meal = z.infer<typeof mealSchema>;
export type ProductType = z.infer<typeof productTypeSchema>;
export type Product = z.infer<typeof productSchema>;
export type Order = z.infer<typeof orderSchema>;
export type PostOrderSchema = z.infer<typeof postOrderSchema>