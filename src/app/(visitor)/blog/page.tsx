import Search from "@/components/ui/Search"
import { Suspense } from "react"
import React from "react"
import PostList from "@/components/PostList"

export default async function BlogsPage(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  return (
    <div className="py-10 md:py-12 lg:py-14">
      <h3 className="mb-8 text-xl font-bold italic md:mb-10 md:text-2xl lg:mb-12 lg:text-3xl">
        Blog Archive
      </h3>
      <Search placeholder="Search by title" className="mb-4 py-2 md:mb-6" />
      <Suspense fallback={<p className="mt-8">Loading posts...</p>}>
        <PostList query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}
