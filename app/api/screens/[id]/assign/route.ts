import { auth } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function POST(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: screenId } = await ctx.params
  const { mediaItemId } = await request.json()

  const screen = await prisma.screen.findUnique({ where: { id: screenId } })
  if (!screen || screen.userId !== session.user.id) {
    return Response.json({ error: "Screen not found" }, { status: 404 })
  }

  const existing = await prisma.screenMedia.findFirst({
    where: { screenId, mediaItemId },
  })
  if (existing) return Response.json(existing)

  const last = await prisma.screenMedia.findFirst({
    where: { screenId },
    orderBy: { order: "desc" },
    select: { order: true },
  })

  const assignment = await prisma.screenMedia.create({
    data: {
      screenId,
      mediaItemId,
      order: (last?.order ?? -1) + 1,
    },
    include: { mediaItem: true },
  })

  return Response.json(assignment, { status: 201 })
}

export async function DELETE(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: screenId } = await ctx.params
  const { mediaItemId } = await request.json()

  const screen = await prisma.screen.findUnique({ where: { id: screenId } })
  if (!screen || screen.userId !== session.user.id) {
    return Response.json({ error: "Screen not found" }, { status: 404 })
  }

  await prisma.screenMedia.deleteMany({ where: { screenId, mediaItemId } })

  return Response.json({ success: true })
}
