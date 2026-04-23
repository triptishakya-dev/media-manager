import { auth } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  let screens = await prisma.screen.findMany({
    where: { userId },
    include: {
      media: {
        include: { mediaItem: true },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { position: "asc" },
  })

  if (screens.length === 0) {
    await prisma.screen.createMany({
      data: Array.from({ length: 6 }, (_, i) => ({
        name: `Screen ${i + 1}`,
        position: i + 1,
        userId,
      })),
    })

    screens = await prisma.screen.findMany({
      where: { userId },
      include: {
        media: {
          include: { mediaItem: true },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { position: "asc" },
    })
  }

  return Response.json(screens)
}
