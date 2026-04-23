"use client"

import type { Screen } from "@/app/tpyes"
import ScreenCard from "./screenCard"

interface Props {
  screens: Screen[]
  onRemove: (screenId: string, mediaItemId: string) => void
}

export default function ScreenGrid({ screens, onRemove }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {screens.map(screen => (
        <ScreenCard key={screen.id} screen={screen} onRemove={onRemove} />
      ))}
    </div>
  )
}
