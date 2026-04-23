import type { NextAuthConfig } from "next-auth"

const protectedPaths = ["/upload", "/media", "/screens"]
const authPages = ["/sign-in", "/sign-up"]

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/sign-in" },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isProtected = protectedPaths.some(p => nextUrl.pathname.startsWith(p))
      const isAuthPage = authPages.some(p => nextUrl.pathname.startsWith(p))

      if (isProtected && !isLoggedIn) return false
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/screens", nextUrl.origin))
      }
      return true
    },
  },
  providers: [],
}
