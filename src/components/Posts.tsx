import Preview from "@/components/ui/Preview"
import { Post } from "@/lib/posts"
import React from "react"

export default async function Posts({ posts }: { posts: Post[] }) {
  return (
    <ul className="flex flex-col gap-2 py-4 md:gap-4 md:py-6 lg:py-8">
      {posts.map(post => (
        <li key={post.slug}>
          <Preview
            slug={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        </li>
      ))}
    </ul>
  )
}
