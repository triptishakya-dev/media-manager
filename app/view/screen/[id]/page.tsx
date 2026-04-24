import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"
import ScreenSlider from "./ScreenSlider"

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
      <ScreenSlider mediaItems={screen.media} />
    </div>
  )
}