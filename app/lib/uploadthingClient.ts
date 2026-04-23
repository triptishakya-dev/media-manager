import { generateReactHelpers } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/lib/uploadthings"

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()
