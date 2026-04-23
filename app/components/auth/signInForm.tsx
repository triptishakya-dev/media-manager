"use client"

import { useActionState } from "react"
import { signInAction } from "@/app/actions/auth"

export default function SignInForm() {
  const [state, action, pending] = useActionState(signInAction, null)

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {state?.error && (
        <p className="text-red-400 text-sm bg-red-950/50 px-3 py-2 rounded-lg">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-zinc-500 text-sm">
        No account?{" "}
        <a
          href="/sign-up"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Sign up
        </a>
      </p>
    </form>
  )
}
