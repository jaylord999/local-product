import type { StoreWithProducts } from '@shared/schema'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Package, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface StoreCardProps {
  store: StoreWithProducts
  isSelected?: boolean
  onClick: () => void
}

export function StoreCard({ store, isSelected, onClick }: StoreCardProps) {
  const formatDistance = (distance?: number) => {
    if (!distance) return ''
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`
  }

  const priceRange = store.products.length > 0 ? {
    min: Math.min(...store.products.map(p => p.price)),
    max: Math.max(...store.products.map(p => p.price))
  } : null

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover-elevate",
        isSelected && "ring-2 ring-primary bg-primary/5"
      )}
      onClick={onClick}
      data-testid={`card-store-${store.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {store.logo && (
            <img 
              src={store.logo} 
              alt={store.name}
              className="w-16 h-16 rounded-lg border object-cover flex-shrink-0"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg leading-tight">{store.name}</h3>
              {store.distance && (
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  {formatDistance(store.distance)}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{store.address}</span>
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Package className="w-3 h-3" />
                <span>{store.products.length} products</span>
              </div>
              
              {priceRange && (
                <div className="text-primary font-medium">
                  ₱{priceRange.min}
                  {priceRange.min !== priceRange.max && ` - ₱${priceRange.max}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {store.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {store.categories.slice(0, 4).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {store.categories.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{store.categories.length - 4}
              </Badge>
            )}
          </div>
        )}

        {store.products.slice(0, 3).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Featured Products</h4>
            <div className="grid grid-cols-3 gap-2">
              {store.products.slice(0, 3).map((product) => (
                <div key={product.id} className="space-y-1">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-20 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-full h-20 bg-muted rounded border flex items-center justify-center">
                      <Package className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="text-xs">
                    <div className="truncate font-medium">{product.name}</div>
                    <div className="text-primary">₱{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" className="gap-1">
            View Details
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}