import React from "react"
import "../globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Whatever you wanna call it"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="">{children}</div>
}
