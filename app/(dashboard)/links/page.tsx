// src/app/(dashboard)/links/page.tsx
"use client"
import { useState, useEffect } from "react"

export default function LinksPage() {
  const [screens, setScreens] = useState<any[]>([])
  const [preview, setPreview] = useState<any>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""

  useEffect(() => {
    fetch("/api/screens")
      .then(res => {
        if (!res.ok) return
        return res.json()
      })
      .then(data => { if (Array.isArray(data)) setScreens(data) })
  }, [])

  function copyLink(screenId: string, url: string) {
    navigator.clipboard.writeText(url)
    setCopied(screenId)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-medium text-white mb-6">Links</h1>

      <div className="grid grid-cols-3 gap-4">
        {screens.map((screen) => {
          const url = `${baseUrl}/view/screen/${screen.id}`
          return (
            <div
              key={screen.id}
              className="bg-[#1a1a1a] border border-[#2c2c2c] rounded-xl p-4 flex flex-col gap-2 cursor-pointer hover:border-[#3a3a3a] transition"
              onClick={() => setPreview(screen)}
            >
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{screen.name}</p>
              <p className="text-[11px] text-blue-400 truncate">{url}</p>
              <div className="flex flex-wrap gap-1">
                {screen.media?.length === 0 ? (
                  <span className="text-[10px] text-gray-600 italic">No media</span>
                ) : (
                  screen.media?.map((sm: any) => (
                    <span key={sm.id} className="bg-[#7a3118] text-[#f0a07a] text-[9px] px-2 py-0.5 rounded truncate max-w-[100px]">
                      {sm.mediaItem.name}
                    </span>
                  ))
                )}
              </div>
              <button
                className="text-[10px] text-gray-500 hover:text-gray-300 text-left mt-1"
                onClick={(e) => { e.stopPropagation(); copyLink(screen.id, url) }}
              >
                {copied === screen.id ? "Copied!" : "Copy link"}
              </button>
            </div>
          )
        })}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50" onClick={() => setPreview(null)}>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl w-[420px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161616] border-b border-[#2a2a2a]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e05c3a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#e0a030]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3ab060]" />
              <span className="flex-1 bg-[#111] rounded px-3 py-1 text-[10px] text-blue-400 truncate">
                {`${baseUrl}/view/screen/${preview.id}`}
              </span>
              <button className="text-gray-500 hover:text-gray-200 text-xs ml-2" onClick={() => setPreview(null)}>✕</button>
            </div>
            <div className="bg-[#0d0d0d] min-h-[200px] flex flex-col items-center justify-center gap-3 p-6">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">{preview.name}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {preview.media?.length === 0 ? (
                  <p className="text-sm text-gray-600">No media assigned</p>
                ) : (
                  preview.media?.map((sm: any) => (
                    <div key={sm.id} className="w-32 h-20 bg-[#7a3118] rounded-lg flex items-end p-2">
                      <span className="text-[9px] text-[#f0a07a] truncate w-full">{sm.mediaItem.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}