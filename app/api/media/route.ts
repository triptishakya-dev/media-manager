import { auth } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const media = await prisma.mediaItem.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return Response.json(media)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, type, url, size } = await request.json()

  const media = await prisma.mediaItem.create({
    data: { name, type, url, size, userId: session.user.id },
  })

  return Response.json(media, { status: 201 })
}
