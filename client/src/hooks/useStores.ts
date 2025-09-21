import { useQuery } from '@tanstack/react-query'
import type { StoreWithProducts, SearchFilters } from '@shared/schema'

export function useStores(filters?: SearchFilters) {
  return useQuery({
    queryKey: ['/api/stores/with-products', filters],
    queryFn: async (): Promise<StoreWithProducts[]> => {
      const params = new URLSearchParams()
      
      if (filters?.category) {
        params.append('category', filters.category)
      }
      if (filters?.searchTerm) {
        params.append('searchTerm', filters.searchTerm)
      }
      if (filters?.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString())
        params.append('maxPrice', filters.priceRange.max.toString())
      }
      
      const url = `/api/stores/with-products${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stores: ${response.statusText}`)
      }
      return response.json()
    },
    staleTime: 30 * 1000, // 30 seconds for filtered results
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}