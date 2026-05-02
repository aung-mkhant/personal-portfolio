"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LinkProps } from "next/dist/client/app-dir/link"
import { cn } from "@/lib/utils"
import React from "react"

export default function NavLink({
  text,
  path,
  className
}: {
  text: string
  path: LinkProps["href"]
  className?: string
}) {
  const pathname = usePathname()
  const isActive = pathname === path
  return (
    <Link
      href={path}
      className={cn(
        "font-serif text-sm font-medium underline-offset-3 md:text-base lg:text-lg",
        `${!isActive && "hover:text-link hover:underline"}`,
        `${isActive && "font-medium text-[#5588ff]"}`,
        className
      )}
    >
      {text}
    </Link>
  )
}
