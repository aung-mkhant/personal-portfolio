"use client"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import React from "react"

export default function Search({
  placeholder,
  className
}: {
  placeholder: string
  className?: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback(term => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className={cn("relative flex flex-1 shrink-0", className)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        aria-label="posts filter"
        className="relative pr-3 pl-10 text-base transition-all placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
        // className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={e => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-base text-foreground peer-focus:text-gray-900 focus:text-lg" />
    </div>
  )
}
