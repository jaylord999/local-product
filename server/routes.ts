import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStoreSchema, insertProductSchema, type SearchFilters } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { seedDatabase } from "./seed";

export async function registerRoutes(app: Express): Promise<Server> {
  // Store routes
  app.get("/api/stores", async (req, res) => {
    try {
      const stores = await storage.getStores();
      res.json(stores);
    } catch (error) {
      console.error("Error fetching stores:", error);
      res.status(500).json({ error: "Failed to fetch stores" });
    }
  });

  app.get("/api/stores/with-products", async (req, res) => {
    try {
      const { category, searchTerm, minPrice, maxPrice } = req.query;
      
      // Build filters from query parameters
      const filters: SearchFilters = {};
      if (category && typeof category === 'string') {
        filters.category = category;
      }
      if (searchTerm && typeof searchTerm === 'string') {
        filters.searchTerm = searchTerm;
      }
      if (minPrice && maxPrice) {
        const min = parseFloat(minPrice as string);
        const max = parseFloat(maxPrice as string);
        if (!isNaN(min) && !isNaN(max)) {
          filters.priceRange = { min, max };
        }
      }
      
      const storesWithProducts = await storage.getStoresWithProducts(filters);
      res.json(storesWithProducts);
    } catch (error) {
      console.error("Error fetching stores with products:", error);
      res.status(500).json({ error: "Failed to fetch stores with products" });
    }
  });

  app.get("/api/stores/:id", async (req, res) => {
    try {
      const store = await storage.getStore(req.params.id);
      if (!store) {
        return res.status(404).json({ error: "Store not found" });
      }
      res.json(store);
    } catch (error) {
      console.error("Error fetching store:", error);
      res.status(500).json({ error: "Failed to fetch store" });
    }
  });

  app.post("/api/stores", async (req, res) => {
    try {
      const result = insertStoreSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const store = await storage.createStore(result.data);
      res.status(201).json(store);
    } catch (error) {
      console.error("Error creating store:", error);
      res.status(500).json({ error: "Failed to create store" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const { storeId } = req.query;
      if (storeId && typeof storeId === 'string') {
        const products = await storage.getProductsByStore(storeId);
        res.json(products);
      } else {
        // If no storeId provided, return all products (could be expensive)
        const stores = await storage.getStoresWithProducts();
        const allProducts = stores.flatMap(store => store.products);
        res.json(allProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const result = insertProductSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const product = await storage.createProduct(result.data);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Seed endpoint for development
  app.post("/api/seed", async (req, res) => {
    try {
      await seedDatabase();
      res.json({ message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ error: "Failed to seed database" });
    }
  });

  const httpServer = createServer(app);

  // Seed database on startup if no stores exist
  setTimeout(async () => {
    try {
      await seedDatabase();
    } catch (error) {
      console.error("Failed to seed database on startup:", error);
    }
  }, 1000); // Give database time to connect

  return httpServer;
}
