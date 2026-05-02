"use client"
import GithubIcon from "../icons/GithubIcon"
import { Button } from "../ui/Button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

export default function Footer({ className }: { className?: string }) {
  const [year, setYear] = useState<number | null>(null)
  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])
  return (
    <footer
      className={cn(
        "flex flex-col gap-4 sm:flex-row-reverse sm:items-center sm:justify-between",
        className
      )}
    >
      <Link href="https://github.com/aung-mkhant" passHref>
        <Button>
          <GithubIcon />
        </Button>
      </Link>

      <span className="font-young-serif text-xs md:text-sm lg:text-base">
        © {year} Aung Min Khant. All rights reserved.
      </span>
    </footer>
  )
}
