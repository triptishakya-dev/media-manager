// import { auth } from "@/lib/auth"
// import { prisma } from "@/lib/prisma"

// export async function DELETE(
//   _request: Request,
//   ctx: { params: Promise<{ id: string }> }
// ) {
//   const session = await auth()
//   if (!session?.user?.id) {
//     return Response.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   const { id } = await ctx.params

//   const media = await prisma.mediaItem.findUnique({ where: { id } })
//   if (!media || media.userId !== session.user.id) {
//     return Response.json({ error: "Not found" }, { status: 404 })
//   }

//   await prisma.screenMedia.deleteMany({ where: { mediaItemId: id } })
//   await prisma.mediaItem.delete({ where: { id } })

//   return Response.json({ success: true })
// }

import { auth } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const media = await prisma.mediaItem.findUnique({
    where: { id },
  })

  if (!media || media.userId !== session.user.id) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.screenMedia.deleteMany({
    where: { mediaItemId: id },
  })

  await prisma.mediaItem.delete({
    where: { id },
  })

  return Response.json({ success: true })
}