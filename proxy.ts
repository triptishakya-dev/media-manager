import NextAuth from "next-auth"
import { authConfig } from "@/app/lib/auth.config"

const { auth } = NextAuth(authConfig)

export const proxy = auth

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
