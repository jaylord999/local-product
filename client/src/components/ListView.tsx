import type { StoreWithProducts } from '@shared/schema'
import { StoreCard } from './StoreCard'
import { ScrollArea } from "@/components/ui/scroll-area"

interface ListViewProps {
  stores: StoreWithProducts[]
  selectedStoreId?: string
  onStoreClick: (storeId: string) => void
}

export function ListView({ stores, selectedStoreId, onStoreClick }: ListViewProps) {
  return (
    <div className="h-full" data-testid="list-view">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {stores.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No stores found matching your criteria.</p>
            </div>
          ) : (
            stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                isSelected={selectedStoreId === store.id}
                onClick={() => onStoreClick(store.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}