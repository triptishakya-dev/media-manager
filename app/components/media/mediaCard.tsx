"use client"

import { useDraggable } from "@dnd-kit/core"
import type { MediaItem } from "@/app/tpyes"

const typeStyles: Record<string, string> = {
  VIDEO: "bg-purple-950 border-purple-700 text-purple-200",
  IMAGE: "bg-orange-950 border-orange-700 text-orange-200",
  PDF: "bg-cyan-950 border-cyan-700 text-cyan-200",
}

const typeLabel: Record<string, string> = {
  VIDEO: "Video",
  IMAGE: "Image",
  PDF: "PDF",
}

interface Props {
  item: MediaItem
  onDelete?: (id: string) => void
}

export default function MediaCard({ item, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: item.id, data: item })

  return (
    <div
      ref={setNodeRef}
      style={
        transform
          ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)` }
          : undefined
      }
      {...listeners}
      {...attributes}
      className={`group relative select-none cursor-grab active:cursor-grabbing rounded-xl border p-3 touch-none transition-opacity ${typeStyles[item.type]} ${isDragging ? "opacity-40 z-50" : ""}`}
    >
      <p className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1">
        {typeLabel[item.type]}
      </p>
      <p className="text-sm font-semibold truncate">{item.name}</p>
      <p className="text-xs opacity-40 mt-0.5">
        {(item.size / 1024 / 1024).toFixed(1)} MB
      </p>
      {onDelete && (
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={e => {
            e.stopPropagation()
            onDelete(item.id)
          }}
          className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/70 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-white"
          aria-label="Delete"
        >
          ✕
        </button>
      )}
    </div>
  )
}
