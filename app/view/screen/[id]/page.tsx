import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"

export default async function ScreenViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const screen = await prisma.screen.findUnique({
    where: { id },
    include: {
      media: {
        include: { mediaItem: true },
        orderBy: { order: "asc" }
      }
    }
  })

  if (!screen) return notFound()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-white text-sm uppercase tracking-widest">{screen.name}</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {screen.media.map((sm: any) => (
          <div key={sm.id} className="w-48 h-32 bg-[#7a3118] rounded-xl flex items-end p-3">
            <span className="text-[#f0a07a] text-xs truncate w-full">{sm.mediaItem.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}