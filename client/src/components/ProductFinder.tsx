import { useState, useEffect, useMemo } from 'react'
import { MapView } from './MapView'
import { ListView } from './ListView'
import { SearchFilters } from './SearchFilters'
import { ViewToggle } from './ViewToggle'
import { ThemeToggle } from './ThemeToggle'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from 'lucide-react'
import { useStores } from '../hooks/useStores'
import { useGeolocation, calculateDistance } from '../hooks/useGeolocation'
import type { ViewMode, SearchFilters as SearchFiltersType } from '@shared/schema'

export function ProductFinder() {
  const [currentView, setCurrentView] = useState<ViewMode>('map')
  const [selectedStoreId, setSelectedStoreId] = useState<string>()
  const [filters, setFilters] = useState<SearchFiltersType>({})
  
  // Fetch stores data from API with filters
  const { data: stores = [], isLoading, error } = useStores(filters)
  
  // Get user's current location
  const geolocation = useGeolocation()

  // Load saved view preference
  useEffect(() => {
    const savedView = localStorage.getItem('preferred-view') as ViewMode
    if (savedView && (savedView === 'map' || savedView === 'list')) {
      setCurrentView(savedView)
    }
  }, [])

  // Save view preference
  useEffect(() => {
    localStorage.setItem('preferred-view', currentView)
  }, [currentView])

  // Calculate distances and sort stores
  const filteredStores = useMemo(() => {
    const storesWithDistance = stores.map(store => {
      let distance = store.distance // Use existing distance if available
      
      // Calculate real distance if we have user location
      if (geolocation.latitude && geolocation.longitude) {
        distance = calculateDistance(
          geolocation.latitude,
          geolocation.longitude,
          store.latitude,
          store.longitude
        )
      }
      
      return { ...store, distance }
    })
    
    // Sort by distance
    return storesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
  }, [stores, geolocation.latitude, geolocation.longitude])

  // Get all unique categories from stores and products
  const allCategories = useMemo(() => {
    const categories = new Set<string>()
    stores.forEach(store => {
      store.categories.forEach(cat => categories.add(cat))
      store.products.forEach(product => categories.add(product.category))
    })
    return Array.from(categories).sort()
  }, [stores])

  const handleStoreClick = (storeId: string) => {
    console.log('Store clicked:', storeId)
    setSelectedStoreId(selectedStoreId === storeId ? undefined : storeId)
  }

  const handleViewChange = (view: ViewMode) => {
    console.log('View changed to:', view)
    setCurrentView(view)
  }

  // Use user location or default to Bohol center coordinates
  const mapCenter: [number, number] = geolocation.latitude && geolocation.longitude 
    ? [geolocation.latitude, geolocation.longitude]
    : [9.6496, 123.8854]

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background" data-testid="loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading stores...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background" data-testid="error">
        <div className="text-center max-w-md px-4">
          <p className="text-destructive mb-4">Failed to load stores</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background" data-testid="product-finder">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">Local Product Finder</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {geolocation.loading ? (
              'Detecting location...'
            ) : geolocation.error ? (
              'Bohol, Philippines'
            ) : (
              'Your Location'
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={allCategories}
          />
          <ViewToggle
            currentView={currentView}
            onViewChange={handleViewChange}
          />
          {geolocation.error && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="gap-2"
              data-testid="button-enable-location"
            >
              <Navigation className="w-4 h-4" />
              Enable Location
            </Button>
          )}
          <ThemeToggle />
        </div>
      </header>

      {/* Results Summary */}
      <div className="px-4 py-2 border-b bg-muted/30">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            'Searching...'
          ) : (
            <>
              Found {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''} 
              {filters.category && ` in "${filters.category}"`}
              {filters.searchTerm && ` matching "${filters.searchTerm}"`}
              {filters.priceRange && ` with items ₱${filters.priceRange.min}-₱${filters.priceRange.max}`}
            </>
          )}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {currentView === 'map' ? (
          <MapView
            stores={filteredStores}
            selectedStoreId={selectedStoreId}
            onStoreClick={handleStoreClick}
            center={mapCenter}
            zoom={13}
          />
        ) : (
          <ListView
            stores={filteredStores}
            selectedStoreId={selectedStoreId}
            onStoreClick={handleStoreClick}
          />
        )}

        {/* Mobile View Toggle - Only visible on small screens */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
          <Card className="p-2">
            <ViewToggle
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}