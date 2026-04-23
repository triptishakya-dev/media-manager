"use client"

import { useMediaItems } from "@/app/hooks/useMediaItems"
import UploadZone from "@/app/components/media/uploadZone"

export default function UploadPage() {
  const { refetch } = useMediaItems()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Upload Media</h1>
      <p className="text-zinc-500 text-sm mb-6">
        Drag and drop or browse to upload videos, images, and PDFs.
      </p>
      <UploadZone onComplete={refetch} />
      <p className="text-zinc-700 text-xs mt-4 text-center">
        Requires <code className="text-zinc-500">UPLOADTHING_TOKEN</code> in{" "}
        <code className="text-zinc-500">.env</code>
      </p>
    </div>
  )
}
