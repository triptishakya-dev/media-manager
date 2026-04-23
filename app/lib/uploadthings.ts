import { createUploadthing, type FileRouter } from "uploadthing/next"
import { auth } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

const f = createUploadthing()

function getMediaType(filename: string): "VIDEO" | "IMAGE" | "PDF" {
  const ext = filename.split(".").pop()?.toLowerCase() ?? ""
  if (["mp4", "mov", "avi", "webm", "mkv"].includes(ext)) return "VIDEO"
  if (["jpg", "jpeg", "png", "gif", "webp", "avif"].includes(ext)) return "IMAGE"
  return "PDF"
}

export const ourFileRouter = {
  mediaUploader: f({
    image: { maxFileSize: "16MB", maxFileCount: 10 },
    video: { maxFileSize: "512MB", maxFileCount: 5 },
    pdf: { maxFileSize: "32MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      const session = await auth()
      if (!session?.user?.id) throw new Error("Unauthorized")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.mediaItem.create({
        data: {
          name: file.name,
          type: getMediaType(file.name),
          url: file.ufsUrl,
          size: file.size,
          userId: metadata.userId,
        },
      })
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
