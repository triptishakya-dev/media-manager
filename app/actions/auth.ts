"use server"

import { signIn, signOut } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"

export async function signInAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/screens",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" }
    }
    throw error
  }
  return null
}

export async function signUpAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const email = (formData.get("email") as string)?.trim()
  const password = formData.get("password") as string
  const name = (formData.get("name") as string)?.trim()

  if (!email || !password) return { error: "Email and password are required" }
  if (password.length < 6) return { error: "Password must be at least 6 characters" }

 
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { error: "An account with that email already exists" }

  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.create({
    data: { email, password: hashed, name: name || undefined },
  })

  await signIn("credentials", { email, password, redirectTo: "/screens" })
  return null
}

export async function signOutAction() {
  await signOut({ redirectTo: "/sign-in" })
}
