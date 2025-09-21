import { useState } from 'react'
import { SearchFilters } from '../SearchFilters'
import type { SearchFilters as SearchFiltersType } from '@shared/schema'

export default function SearchFiltersExample() {
  const [filters, setFilters] = useState<SearchFiltersType>({})
  
  const mockCategories = ['hardware', 'food', 'tools', 'construction', 'farm', 'eggs']

  return (
    <div className="p-4 space-y-4">
      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        categories={mockCategories}
      />
      
      <div className="text-sm text-muted-foreground">
        <p>Current filters: {JSON.stringify(filters, null, 2)}</p>
      </div>
    </div>
  )
}