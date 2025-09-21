import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { StoreWithProducts } from '@shared/schema'
import { StorePopup } from './StorePopup'

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom store marker icon - safely handle logo URLs
const createStoreIcon = (logoUrl?: string) => {
  if (logoUrl && (logoUrl.startsWith('http://') || logoUrl.startsWith('https://'))) {
    // Create DOM element safely instead of using HTML string
    const div = document.createElement('div')
    div.className = 'store-marker'
    
    const img = document.createElement('img')
    img.src = logoUrl
    img.alt = 'Store'
    img.style.cssText = 'width: 32px; height: 32px; border-radius: 50%; border: 2px solid hsl(var(--primary)); background: white; object-fit: cover;'
    
    // Handle image load errors gracefully
    img.onerror = () => {
      img.style.display = 'none'
    }
    
    div.appendChild(img)
    
    return L.divIcon({
      html: div.outerHTML,
      className: 'custom-store-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    })
  }
  return new L.Icon.Default()
}

interface MapViewProps {
  stores: StoreWithProducts[]
  selectedStoreId?: string
  onStoreClick: (storeId: string) => void
  center: [number, number]
  zoom: number
}

function MapController({ 
  selectedStoreId, 
  stores 
}: { 
  selectedStoreId?: string
  stores: StoreWithProducts[]
}) {
  const map = useMap()
  
  useEffect(() => {
    if (selectedStoreId) {
      const store = stores.find(s => s.id === selectedStoreId)
      if (store) {
        map.setView([store.latitude, store.longitude], 16, { animate: true })
      }
    }
  }, [selectedStoreId, stores, map])
  
  return null
}

export function MapView({ stores, selectedStoreId, onStoreClick, center, zoom }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null)

  return (
    <div className="h-full w-full relative" data-testid="map-view">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        ref={mapRef as any}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController selectedStoreId={selectedStoreId} stores={stores} />
        
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.latitude, store.longitude]}
            icon={createStoreIcon(store.logo)}
            eventHandlers={{
              click: () => onStoreClick(store.id),
            }}
          >
            <Popup>
              <StorePopup store={store} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}