import React from "react"
import { cn } from "@/lib/utils"

export default function Section({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("py-12 md:py-14 lg:py-16", className)}>
      {children}
    </section>
  )
}
