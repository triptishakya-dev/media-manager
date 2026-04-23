"use client"

import { useCallback, useState } from "react"
import { useUploadThing } from "@/app/lib/uploadthingClient"

interface Props {
  onComplete: () => void
}

export default function UploadZone({ onComplete }: Props) {
  const [isDragging, setIsDragging] = useState(false)

  const { startUpload, isUploading } = useUploadThing("mediaUploader", {
    onClientUploadComplete: () => onComplete(),
    onUploadError: err => alert(`Upload failed: ${err.message}`),
  })

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) startUpload(files)
    },
    [startUpload]
  )

  return (
    <div
      onDragOver={e => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`rounded-2xl border-2 border-dashed p-16 text-center transition-all ${
        isDragging
          ? "border-blue-400 bg-blue-950/20"
          : "border-zinc-700 hover:border-zinc-500"
      }`}
    >
      {isUploading ? (
        <div className="space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-zinc-400">Uploading…</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-4xl select-none">⬆</p>
          <div>
            <p className="text-zinc-200 font-medium">Drop files here</p>
            <p className="text-zinc-500 text-sm mt-1">
              MP4, MOV, PDF, JPG, PNG, GIF — up to 512 MB
            </p>
          </div>
          <label className="inline-block cursor-pointer px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Browse files
            <input
              type="file"
              multiple
              accept="video/*,application/pdf,image/*"
              className="hidden"
              onChange={e => {
                const files = Array.from(e.target.files ?? [])
                if (files.length > 0) startUpload(files)
                e.target.value = ""
              }}
            />
          </label>
        </div>
      )}
    </div>
  )
}
