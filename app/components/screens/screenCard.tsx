"use client"

import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import type { Screen, MediaItem } from "@/app/tpyes"
import ScreenPlayer from "./screenPlayer"

const typeBadge: Record<string, string> = {
  VIDEO: "bg-purple-800 text-purple-100",
  IMAGE: "bg-orange-800 text-orange-100",
  PDF: "bg-cyan-800 text-cyan-100",
}

interface Props {
  screen: Screen
  onRemove: (screenId: string, mediaItemId: string) => void
}

export default function ScreenCard({ screen, onRemove }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: screen.id })
  const [playing, setPlaying] = useState<MediaItem | null>(null)

  return (
    <>
      <div
        ref={setNodeRef}
        className={`rounded-xl border-2 p-3 min-h-[160px] flex flex-col transition-colors ${
          isOver
            ? "border-blue-400 bg-zinc-800"
            : "border-zinc-700 bg-zinc-900"
        }`}
      >
        <p className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
          {screen.name}
        </p>
        {screen.media.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-zinc-600 text-xs">
            Drop media here
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 flex-1 content-start">
            {screen.media.map(({ mediaItem }) => (
              <button
                key={mediaItem.id}
                onClick={() => setPlaying(mediaItem)}
                className={`group relative rounded-md px-2 py-1 text-xs font-medium max-w-full ${typeBadge[mediaItem.type]}`}
              >
                <span className="truncate block max-w-[100px]">
                  {mediaItem.name}
                </span>
                <span
                  role="button"
                  onClick={e => {
                    e.stopPropagation()
                    onRemove(screen.id, mediaItem.id)
                  }}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-300"
                >
                  ✕
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {playing && (
        <ScreenPlayer item={playing} onClose={() => setPlaying(null)} />
      )}
    </>
  )
}
