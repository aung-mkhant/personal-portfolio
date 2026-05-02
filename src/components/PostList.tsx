import { getLatestPosts } from "@/lib/posts"
import Fuse from "fuse.js"
import React from "react"
import Posts from "@/components/Posts"

// Data fetching now happens inside this child component
export default async function PostList({
  query,
  currentPage
}: {
  query: string
  currentPage: number
}) {
  const posts = getLatestPosts()
  const fuse = new Fuse(posts, {
    keys: [
      { name: "title", weight: 2 },
      { name: "excerpt", weight: 1 }
    ]
  })
  // fuzzy search based on query
  const filteredPosts = fuse.search(query).map(result => result.item)
  return <Posts posts={filteredPosts} />
}
