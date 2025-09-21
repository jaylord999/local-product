import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { SearchFilters } from '@shared/schema'

interface SearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  categories: string[]
}

export function SearchFilters({ filters, onFiltersChange, categories }: SearchFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([
    filters.priceRange?.min ?? 0,
    filters.priceRange?.max ?? 1000
  ])

  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      searchTerm: value || undefined
    })
  }

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category === 'all' ? undefined : category
    })
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    onFiltersChange({
      ...filters,
      priceRange: {
        min: values[0],
        max: values[1]
      }
    })
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    onFiltersChange({})
    setIsFilterOpen(false)
  }

  const activeFilterCount = [
    filters.category,
    filters.priceRange,
    filters.searchTerm
  ].filter(Boolean).length

  return (
    <div className="flex gap-2" data-testid="search-filters">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products or stores..."
          value={filters.searchTerm || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>

      {/* Category Select */}
      <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-48" data-testid="select-category">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Advanced Filters */}
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2" data-testid="button-filters">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="rounded-full px-1 min-w-5 h-5 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">Filters</h4>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range</Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>₱{priceRange[0]}</span>
                <span>₱{priceRange[1]}</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filter Display */}
      {(filters.category || filters.searchTerm || filters.priceRange) && (
        <div className="flex items-center gap-1 ml-2">
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleCategoryChange('all')}
              />
            </Badge>
          )}
          {filters.searchTerm && (
            <Badge variant="secondary" className="gap-1">
              "{filters.searchTerm}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleSearchChange('')}
              />
            </Badge>
          )}
          {filters.priceRange && (
            <Badge variant="secondary" className="gap-1">
              ₱{filters.priceRange.min}-₱{filters.priceRange.max}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  setPriceRange([0, 1000])
                  onFiltersChange({ ...filters, priceRange: undefined })
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}