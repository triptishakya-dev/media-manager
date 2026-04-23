"use client"

import type { MediaItem } from "@/app/tpyes"
import MediaCard from "./mediaCard"

interface Props {
  items: MediaItem[]
  onDelete: (id: string) => void
}

export default function MediaGrid({ items, onDelete }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 rounded-xl border border-dashed border-zinc-700 text-zinc-600 text-sm">
        No media yet — upload some files!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(item => (
        <MediaCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  )
}
