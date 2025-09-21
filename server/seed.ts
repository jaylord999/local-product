import { storage } from './storage'
import type { InsertStore, InsertProduct } from '@shared/schema'

const sampleStores: InsertStore[] = [
  {
    name: 'Bohol Hardware Store',
    logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=64&h=64&fit=crop&crop=center',
    latitude: 9.6496,
    longitude: 123.8854,
    address: '123 Main St, Tagbilaran City, Bohol',
    categories: ['hardware', 'tools', 'construction'],
  },
  {
    name: 'Fresh Duck Eggs Farm',
    logo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=64&h=64&fit=crop&crop=center',
    latitude: 9.6520,
    longitude: 123.8820,
    address: '456 Farm Road, Tagbilaran City, Bohol',
    categories: ['food', 'eggs', 'farm'],
  },
  {
    name: 'Tropical Food Market',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=64&h=64&fit=crop&crop=center',
    latitude: 9.6480,
    longitude: 123.8900,
    address: '789 Market St, Tagbilaran City, Bohol',
    categories: ['food', 'grocery', 'local'],
  },
  {
    name: 'Bohol Construction Supply',
    logo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=64&h=64&fit=crop&crop=center',
    latitude: 9.6450,
    longitude: 123.8780,
    address: '321 Industrial Ave, Tagbilaran City, Bohol',
    categories: ['construction', 'hardware', 'building'],
  }
]

const sampleProducts: InsertProduct[] = [
  // Hardware Store Products
  {
    storeId: '', // Will be set dynamically
    name: 'Professional Hammer',
    price: 250,
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=200&h=200&fit=crop',
    category: 'tools'
  },
  {
    storeId: '',
    name: 'Stainless Steel Screws Pack',
    price: 150,
    image: 'https://images.unsplash.com/photo-1609205807107-171fcc22faea?w=200&h=200&fit=crop',
    category: 'hardware'
  },
  {
    storeId: '',
    name: 'Power Drill',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=200&h=200&fit=crop',
    category: 'tools'
  },
  // Farm Products
  {
    storeId: '',
    name: 'Fresh Duck Eggs (dozen)',
    price: 180,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop',
    category: 'food'
  },
  {
    storeId: '',
    name: 'Traditional Balut (piece)',
    price: 25,
    image: 'https://images.unsplash.com/photo-1607623488041-d5e8a45b7dda?w=200&h=200&fit=crop',
    category: 'food'
  },
  // Market Products
  {
    storeId: '',
    name: 'Organic Rice (5kg)',
    price: 320,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
    category: 'food'
  },
  {
    storeId: '',
    name: 'Fresh Coconut',
    price: 45,
    image: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee?w=200&h=200&fit=crop',
    category: 'food'
  },
  {
    storeId: '',
    name: 'Local Honey (500ml)',
    price: 280,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop',
    category: 'food'
  },
  // Construction Supply Products
  {
    storeId: '',
    name: 'Cement Bag (40kg)',
    price: 210,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop',
    category: 'construction'
  },
  {
    storeId: '',
    name: 'Steel Rebar',
    price: 850,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop',
    category: 'construction'
  }
]

export async function seedDatabase() {
  console.log('Starting database seeding...')
  
  try {
    // First check if stores already exist
    const existingStores = await storage.getStores()
    if (existingStores.length > 0) {
      console.log('Database already seeded, skipping...')
      return
    }

    // Create stores
    const createdStores = []
    for (const storeData of sampleStores) {
      const store = await storage.createStore(storeData)
      createdStores.push(store)
      console.log(`Created store: ${store.name}`)
    }

    // Create products for each store
    const productsByStore = [
      sampleProducts.slice(0, 3), // Hardware store gets first 3 products
      sampleProducts.slice(3, 5), // Farm gets next 2 products 
      sampleProducts.slice(5, 8), // Market gets next 3 products
      sampleProducts.slice(8, 10) // Construction gets last 2 products
    ]

    for (let i = 0; i < createdStores.length; i++) {
      const store = createdStores[i]
      const products = productsByStore[i]
      
      for (const productData of products) {
        const productWithStore = { ...productData, storeId: store.id }
        const product = await storage.createProduct(productWithStore)
        console.log(`Created product: ${product.name} for ${store.name}`)
      }
    }

    console.log('Database seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}