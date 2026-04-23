import { auth, signOut } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect("/sign-in")

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <nav className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <span className="font-bold text-white text-sm">Media Manager</span>
          <Link
            href="/upload"
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            Upload
          </Link>
          <Link
            href="/media"
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            Library
          </Link>
          <Link
            href="/screens"
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            Screens
          </Link>


            <Link
            href="/links"
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            links
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-sm hidden sm:block">
            {session.user?.email}
          </span>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/sign-in" })
            }}
          >
            <button
              type="submit"
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
