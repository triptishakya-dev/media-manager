import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

function resolveConnectionString(url: string): string {
  if (url.startsWith("prisma+postgres://localhost")) {
    const apiKey = new URL(url).searchParams.get("api_key")!
    return JSON.parse(Buffer.from(apiKey, "base64").toString()).databaseUrl
  }
  return url
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(resolveConnectionString(process.env.DATABASE_URL!)),
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
