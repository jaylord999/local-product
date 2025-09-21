import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Store schema
export const stores = pgTable("stores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo"), // image URL
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  address: text("address").notNull(),
  categories: text("categories").array().notNull().default(sql`'{}'::text[]`), // array of category strings
});

// Product schema
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storeId: varchar("store_id").notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  image: text("image"), // image URL
  category: text("category").notNull(),
});

// Insert schemas with validation
export const insertStoreSchema = createInsertSchema(stores).omit({
  id: true,
}).extend({
  logo: z.string().url().startsWith('https://').optional().or(z.literal('')).or(z.undefined()),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
}).extend({
  image: z.string().url().startsWith('https://').optional().or(z.literal('')).or(z.undefined()),
});

// Types
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof stores.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Search/Filter types
export type ViewMode = 'map' | 'list';
export type PriceRange = {
  min: number;
  max: number;
};

export type SearchFilters = {
  category?: string;
  priceRange?: PriceRange;
  searchTerm?: string;
};

// Store with products for display
export type StoreWithProducts = Store & {
  products: Product[];
  distance?: number; // calculated distance from user
};
