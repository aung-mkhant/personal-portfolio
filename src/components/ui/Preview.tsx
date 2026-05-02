import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Post } from "@/lib/posts"
import { Badge } from "@/components/ui/Badge"
import React from "react"

export default function Preview({
  slug,
  title,
  date,
  excerpt,
  tags
}: Pick<Post, "slug" | "title" | "date" | "excerpt" | "tags">) {
  return (
    <div className="flex flex-col gap-4 py-4 md:py-6">
      <div className="flex flex-col gap-1">
        <Link href={`/blog/${slug}`} className="hover:underline">
          <span className="font-literata text-xl leading-tight font-bold md:text-2xl">
            {title}
          </span>
        </Link>
        <p className="font-young-serif text-xs text-gray-400 md:text-sm">
          <time>{formatDate(date)}</time>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge key={tag as string} variant="neutral" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col gap-1 md:gap-2">
        <p className="font-literata text-sm font-medium text-gray-600 md:text-base lg:text-lg dark:text-gray-300">
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="text-xs font-medium text-link underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  )
}
