import { ListView } from '../ListView'
import type { StoreWithProducts } from '@shared/schema'

// Mock data for demonstration  
const mockStores: StoreWithProducts[] = [
  {
    id: '1',
    name: 'Bohol Hardware Store',
    logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=64&h=64&fit=crop&crop=center',
    latitude: 9.6496,
    longitude: 123.8854,
    address: '123 Main St, Tagbilaran City',
    categories: ['hardware', 'tools', 'construction'],
    products: [
      {
        id: '1',
        storeId: '1',
        name: 'Hammer',
        price: 250,
        image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=200&h=200&fit=crop',
        category: 'tools'
      },
      {
        id: '2',
        storeId: '1', 
        name: 'Screws Pack',
        price: 150,
        image: 'https://images.unsplash.com/photo-1609205807107-171fcc22faea?w=200&h=200&fit=crop',
        category: 'hardware'
      }
    ],
    distance: 0.5
  },
  {
    id: '2',
    name: 'Fresh Duck Eggs Farm',
    logo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=64&h=64&fit=crop&crop=center',
    latitude: 9.6520,
    longitude: 123.8820,
    address: '456 Farm Road, Tagbilaran City',
    categories: ['food', 'eggs', 'farm'],
    products: [
      {
        id: '3',
        storeId: '2',
        name: 'Duck Eggs (dozen)',
        price: 180,
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop',
        category: 'food'
      },
      {
        id: '4',
        storeId: '2',
        name: 'Balut (piece)',
        price: 25,
        image: 'https://images.unsplash.com/photo-1607623488041-d5e8a45b7dda?w=200&h=200&fit=crop',
        category: 'food'
      }
    ],
    distance: 1.2
  }
]

export default function ListViewExample() {
  return (
    <div style={{ height: '400px' }}>
      <ListView
        stores={mockStores}
        selectedStoreId="1"
        onStoreClick={(id) => console.log('Store clicked:', id)}
      />
    </div>
  )
}