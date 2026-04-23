"use client"

import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { useState } from "react"
import { useMediaItems } from "@/app/hooks/useMediaItems"
import { useScreens } from "@/app/hooks/useScreens"
import MediaGrid from "@/app/components/media/mediaGrid"
import ScreenGrid from "@/app/components/screens/screenGrid"
import type { MediaItem } from "@/app/tpyes"

export default function ScreensPage() {
  const { items, loading: mediaLoading, deleteItem } = useMediaItems()
  const { screens, loading: screensLoading, assignMedia, removeMedia } =
    useScreens()
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null)

  function handleDragStart(event: DragStartEvent) {
    setActiveItem(items.find(i => i.id === event.active.id) ?? null)
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null)
    const { active, over } = event
    if (!over) return
    try {
      await assignMedia(over.id as string, active.id as string)
    } catch {
      // silently ignore duplicate assignments
    }
  }

  if (mediaLoading || screensLoading) {
    return <p className="text-zinc-500 text-sm">Loading…</p>
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-8 h-full">
        <div className="w-56 shrink-0">
          <h2 className="text-base font-semibold text-white mb-3">
            Media{" "}
            <span className="text-zinc-500 font-normal text-sm">
              ({items.length})
            </span>
          </h2>
          <MediaGrid items={items} onDelete={deleteItem} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-white mb-3">Screens</h2>
          <ScreenGrid screens={screens} onRemove={removeMedia} />
        </div>
      </div>
      <DragOverlay>
        {activeItem && (
          <div className="rotate-2 opacity-90 scale-105 rounded-xl border border-blue-400 bg-zinc-800 px-3 py-2 text-sm text-white shadow-2xl cursor-grabbing">
            {activeItem.name}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
