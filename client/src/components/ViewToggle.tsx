import { Map, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { ViewMode } from '@shared/schema'
import { cn } from "@/lib/utils"

interface ViewToggleProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex border rounded-md" data-testid="view-toggle">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-r-none border-r",
          currentView === 'map' && "bg-primary text-primary-foreground"
        )}
        onClick={() => onViewChange('map')}
        data-testid="button-view-map"
      >
        <Map className="h-4 w-4 mr-2" />
        Map
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-l-none",
          currentView === 'list' && "bg-primary text-primary-foreground"
        )}
        onClick={() => onViewChange('list')}
        data-testid="button-view-list"
      >
        <List className="h-4 w-4 mr-2" />
        List
      </Button>
    </div>
  )
}