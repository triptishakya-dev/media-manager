"use client"

import { useMediaItems } from "@/app/hooks/useMediaItems"
import MediaGrid from "@/app/components/media/mediaGrid"

export default function MediaPage() {
  const { items, loading, error, deleteItem } = useMediaItems()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Media Library</h1>
        <span className="text-zinc-500 text-sm">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>
      {loading && (
        <p className="text-zinc-500 text-sm">Loading…</p>
      )}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      {!loading && (
        <MediaGrid items={items} onDelete={deleteItem} />
      )}
    </div>
  )
}
