"use server"

import { AuthFormState } from "@/lib/definitions"
import bcrypt from "bcryptjs"
import { createSession, deleteSession } from "@/lib/session"
import { redirect } from "next/navigation"
export async function authenticate(state: AuthFormState, formData: FormData) {
  if (!process.env.ADMIN_ID || !process.env.ADMIN_PASSWORD_HASH) {
    throw new Error("Missing critical Admin configuration in .env")
  }
  const password = formData.get("password")
  if (!password) {
    // No password case
    return {
      errors: { password: ["Password is required."] }
    }
  }
  const isCorrect = await bcrypt.compare(
    (password as string).trim(),
    process.env.ADMIN_PASSWORD_HASH || ""
  )
  if (!isCorrect) {
    return {
      errors: { password: ["Incorrect admin credentials."] }
    }
  }
  await createSession(process.env.ADMIN_ID)
  redirect("/admin")
}
export async function logOut() {
  await deleteSession()
  redirect("/admin")
}
