import type { StoreWithProducts } from '@shared/schema'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MapPin, Package } from "lucide-react"

interface StorePopupProps {
  store: StoreWithProducts
}

export function StorePopup({ store }: StorePopupProps) {
  const formatDistance = (distance?: number) => {
    if (!distance) return ''
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`
  }

  const priceRange = store.products.length > 0 ? {
    min: Math.min(...store.products.map(p => p.price)),
    max: Math.max(...store.products.map(p => p.price))
  } : null

  return (
    <Card className="w-64 p-4 border-0 shadow-lg" data-testid={`popup-store-${store.id}`}>
      <div className="flex items-start gap-3">
        {store.logo && (
          <img 
            src={store.logo} 
            alt={store.name}
            className="w-12 h-12 rounded-full border-2 border-primary object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg leading-tight">{store.name}</h3>
          
          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{store.address}</span>
          </div>
          
          {store.distance && (
            <div className="text-sm text-muted-foreground mt-1">
              {formatDistance(store.distance)} away
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {store.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {store.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {store.categories.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{store.categories.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Package className="w-3 h-3" />
            <span>{store.products.length} products</span>
          </div>
          
          {priceRange && (
            <div className="text-right">
              <span className="font-medium">₱{priceRange.min}</span>
              {priceRange.min !== priceRange.max && (
                <span className="text-muted-foreground"> - ₱{priceRange.max}</span>
              )}
            </div>
          )}
        </div>

        {store.products.slice(0, 2).length > 0 && (
          <div className="flex gap-2 mt-2">
            {store.products.slice(0, 2).map((product) => (
              <div key={product.id} className="flex-1 min-w-0">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-16 object-cover rounded border"
                  />
                )}
                <div className="mt-1">
                  <div className="text-xs truncate">{product.name}</div>
                  <div className="text-xs font-medium text-primary">₱{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}