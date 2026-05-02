import { cn, formatDate } from "@/lib/utils"
import { Post } from "@/lib/posts"
import RenderMarkdown from "@/components/RenderMarkdown"
import React from "react"
export default async function BlogPost({
  children,
  title,
  date,
  author,
  slug,
  tags,
  excerpt
}: Omit<Post, "content"> & { children: string }) {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="font-young-serif text-2xl leading-tight font-bold md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <div className="mt-3 flex items-center gap-2 font-young-serif text-xs text-zinc-500 md:text-sm dark:text-zinc-400">
        <time>{formatDate(date)}</time>
        <span>•</span>
        <span>By {author}</span>
      </div>
      <p className="mt-8 border-l-2 border-zinc-200 pl-4 font-literata text-base text-zinc-600 italic md:border-l-4 md:text-xl dark:border-zinc-800 dark:text-zinc-300">
        {excerpt}
      </p>
      <div
        className={cn(
          "prose prose-base text-foreground prose-slate dark:prose-invert",
          "md:prose-lg lg:prose-xl",
          "font-literata",
          "prose-figure:my-0 prose-img:my-0"
        )}
      >
        <RenderMarkdown>{children}</RenderMarkdown>
      </div>
    </article>
  )
}
