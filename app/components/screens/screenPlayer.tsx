"use client"

import { useEffect } from "react"
import type { MediaItem } from "@/app/tpyes"

interface Props {
  item: MediaItem
  onClose: () => void
}

export default function ScreenPlayer({ item, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <span className="text-white font-medium truncate">{item.name}</span>
          <button
            onClick={onClose}
            className="ml-4 text-zinc-400 hover:text-white text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="bg-black">
          {item.type === "VIDEO" && (
            <video
              src={item.url}
              controls
              autoPlay
              className="w-full aspect-video"
            />
          )}
          {item.type === "IMAGE" && (
            <img
              src={item.url}
              alt={item.name}
              className="w-full max-h-[75vh] object-contain"
            />
          )}
          {item.type === "PDF" && (
            <iframe
              src={item.url}
              title={item.name}
              className="w-full h-[75vh]"
            />
          )}
        </div>
      </div>
    </div>
  )
}
