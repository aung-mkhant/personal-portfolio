import BlogPost from "@/components/ui/BlogPost"
import { getPostData } from "@/lib/posts"
import { notFound } from "next/navigation"
import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/Breadcrumb"
import Link from "next/link"

export default async function BlogPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const post = getPostData(slug)
  if (!post) return notFound()
  return (
    <div className="py-10 md:py-12 lg:py-14">
      <BlogPost
        tags={post.tags}
        slug={post.slug}
        author={post.author}
        title={post.title}
        date={post.date}
        excerpt={post.excerpt}
      >
        {post.content}
      </BlogPost>
    </div>
  )
}
