import { createRouteHandler } from "uploadthing/next"
import { ourFileRouter } from "@/app/lib/uploadthings"

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
})
