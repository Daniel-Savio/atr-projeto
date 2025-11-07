import { uuid, pgTable, varchar, json } from "drizzle-orm/pg-core";
import { string } from "zod";

export const productsTable = pgTable("products", {
    id: uuid().defaultRandom().primaryKey(),
    type: varchar({ length: 50 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    price: varchar().notNull(),
});

export const mealsTable = pgTable("meals", {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    price: varchar().notNull(),
    weekendPrice: varchar(),
});

export const ordersTable = pgTable("orders", {
    id: uuid().defaultRandom().primaryKey(),
    number: varchar({ length: 50 }).notNull(),
    date: varchar({ length: 50 }).notNull(),
    meals: json().notNull(),
    otherItems: json().default([]),
    total: varchar().notNull(),

});
