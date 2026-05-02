import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"

export default function Card({
  children,
  imgSrc,
  imgAlt,
  className
}: {
  children: React.ReactNode
  imgSrc: string
  imgAlt: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex max-w-[300px] flex-col items-center gap-8 p-5 px-6",
        className
      )}
    >
      <Image
        src={imgSrc}
        width={80}
        height={80}
        alt={imgAlt}
        className="w-14 md:w-16 lg:w-20"
      />
      <p className="font-literata text-base leading-relaxed md:text-lg">
        {children}
      </p>
    </div>
  )
}
