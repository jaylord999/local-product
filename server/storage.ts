import { type Store, type Product, type InsertStore, type InsertProduct, type StoreWithProducts, type SearchFilters, stores, products } from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and, gte, lte, ilike, or, inArray } from "drizzle-orm";

// Database setup
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getStore(id: string): Promise<Store | undefined>;
  getStores(): Promise<Store[]>;
  getStoresWithProducts(filters?: SearchFilters): Promise<StoreWithProducts[]>;
  createStore(store: InsertStore): Promise<Store>;
  
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByStore(storeId: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Database storage - no need for in-memory maps
  }

  async getStore(id: string): Promise<Store | undefined> {
    const result = await db.select().from(stores).where(eq(stores.id, id)).limit(1);
    return result[0];
  }

  async getStores(): Promise<Store[]> {
    return await db.select().from(stores);
  }

  async getStoresWithProducts(filters?: SearchFilters): Promise<StoreWithProducts[]> {
    let allStores = await this.getStores();
    
    // Apply search term filter on stores
    if (filters?.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      allStores = allStores.filter(store => 
        store.name.toLowerCase().includes(searchTerm) ||
        store.address.toLowerCase().includes(searchTerm) ||
        store.categories.some(cat => cat.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply category filter on stores
    if (filters?.category) {
      allStores = allStores.filter(store =>
        store.categories.includes(filters.category!)
      );
    }
    
    // Get products for each store and apply filters
    const storesWithProducts = await Promise.all(
      allStores.map(async (store) => {
        let storeProducts = await this.getProductsByStore(store.id);
        
        // Apply product-level filters
        if (filters?.searchTerm) {
          const searchTerm = filters.searchTerm.toLowerCase();
          storeProducts = storeProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
          );
        }
        
        if (filters?.category) {
          storeProducts = storeProducts.filter(product =>
            product.category === filters.category
          );
        }
        
        if (filters?.priceRange) {
          storeProducts = storeProducts.filter(product =>
            product.price >= filters.priceRange!.min &&
            product.price <= filters.priceRange!.max
          );
        }
        
        return { ...store, products: storeProducts };
      })
    );
    
    // Filter out stores with no matching products if search/category filters are applied
    if (filters?.searchTerm || filters?.category || filters?.priceRange) {
      return storesWithProducts.filter(store => store.products.length > 0);
    }
    
    return storesWithProducts;
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const result = await db.insert(stores).values(insertStore).returning();
    return result[0];
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getProductsByStore(storeId: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.storeId, storeId));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(insertProduct).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
