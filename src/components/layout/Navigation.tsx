"use client"
import React from "react"
import { cn } from "@/lib/utils"

export default function Navigation({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <nav className={cn("mx-auto flex max-w-3xl items-center gap-6", className)}>
      {children}
    </nav>
  )
}
