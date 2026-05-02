import fs from "fs"
import matter from "gray-matter"
import { join } from "path"

const postsDirectory = join(process.cwd(), "_posts")

export function getPostFileNames() {
  return fs.readdirSync(postsDirectory)
}

export type Post = {
  title: string
  date: Date
  excerpt: string
  slug: string
  content: string
  author: string
  tags: String[]
}

export function getPostData(identifier: string): Post {
  const slug = identifier.replace(/\.md$/, "")
  const postFilePath = join(postsDirectory, `${slug}.md`)
  const rawContent = fs.readFileSync(postFilePath, "utf8")
  const { data, content } = matter(rawContent)
  return { ...data, slug, content } as Post
}

export function getLatestPosts(limit?: number): Post[] {
  const slugs = getPostFileNames()
  const allPosts = slugs
    // Make an array of HTML-converted posts
    .map(slug => getPostData(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return limit ? allPosts.slice(0, limit) : allPosts
}
