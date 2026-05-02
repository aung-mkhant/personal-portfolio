import { logOut } from "@/app/actions/auth"
import { Button } from "@/components/ui/Button"
import MarkdownEditor from "@/components/MarkdownEditor"
import { verifySession } from "@/lib/session"
import { redirect } from "next/navigation"
import React from "react"

export default async function Admin() {
  const { isAuth } = await verifySession()
  if (!isAuth) redirect("/admin/login")
  return (
    <div>
      <MarkdownEditor></MarkdownEditor>
      <Button onClick={logOut}>Log out</Button>
    </div>
  )
}
