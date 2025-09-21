import { useState } from 'react'
import { ViewToggle } from '../ViewToggle'
import type { ViewMode } from '@shared/schema'

export default function ViewToggleExample() {
  const [currentView, setCurrentView] = useState<ViewMode>('map')

  return (
    <div className="p-4 space-y-4">
      <ViewToggle
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <div className="text-sm text-muted-foreground">
        <p>Current view: {currentView}</p>
      </div>
    </div>
  )
}