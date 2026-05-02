"use client"
import React, { useEffect, useRef, useTransition } from "react"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { Button } from "@/components/ui/Button"
import { uploadImageToGithub, uploadPostToGithub } from "@/app/actions/posts"
import matter from "gray-matter"
import { fileToBase64 } from "@/lib/utils"
import toast from "react-hot-toast"
import RenderMarkdown from "@/components/RenderMarkdown"

// Implemented using react-markdown-editor-lite
export default function MarkdownEditor() {
  const mdRef = useRef<MdEditor>(null)
  const [isPending, startTransition] = useTransition()
  // to store blob images
  const pendingImages = useRef<{ [key: string]: File }>({})

  useEffect(() => {
    // Set basic post template so that when they are fetched, frontmatter can be parsed consistently
    // TODO: Add string formatting with variables
    if (mdRef.current) {
      mdRef.current.setText(`---
title: "Building My Portfolio"
excerpt: "See the magic behind this website, what technologies are used and a better alternative."
coverImage: "/assets/blog/building-my-portfolio/cover.jpg"
date: "${new Date().toISOString()}"
author: "Aung Min Khant"
---

# Your Post Title...`)
    }
  }, [])

  useEffect(() => {
    const blobsToClean = pendingImages.current
    return () => {
      cleanBlobs(blobsToClean)
    }
  }, [])

  function cleanBlobs(urlObject: { [key: string]: File }) {
    // clean blob urls to prevent memory leak
    Object.keys(urlObject).forEach(url => {
      URL.revokeObjectURL(url)
    })
    pendingImages.current = {}
  }
  async function handleImageUpload(
    file: File,
    callback: (url: string) => void
  ) {
    const blobUrl = URL.createObjectURL(file)
    // 1. Store for handleSubmit
    pendingImages.current[blobUrl] = file
    return new Promise(resolve => {
      resolve(blobUrl)
    })
  }

  function handleSubmit() {
    let initialRawText = mdRef.current?.getMdValue()
    function slugify(text: string) {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars (punctuation, etc)
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "")
    }

    if (!initialRawText) {
      alert("Post is too short!")
      return
    }

    let rawText = initialRawText
    const { data } = matter(rawText)
    if (!data.title) {
      alert("Frontmatter must include a title!")
      return
    }
    const postTitle = slugify(data.title)
    // updates wrapped in startTransition can be interrupted by "urgent" events like typing or clicking
    startTransition(async () => {
      try {
        // 1. Find all local blob URLs in the text
        const blobRegex = /blob:http[^\s)]+/g
        const matches = rawText.match(blobRegex) || []
        const failedImages: string[] = []
        // 2. Upload each pending image
        for (const blobUrl of matches) {
          const file = pendingImages.current[blobUrl]
          // Only upload if the file exists AND the blob is still in the text
          if (file && rawText.includes(blobUrl)) {
            try {
              // Re-use your existing logic to get base64
              const base64String = await fileToBase64(file)
              const fileName = `${Date.now()}-${file.name}`

              const imageResult = await uploadImageToGithub(
                postTitle,
                fileName,
                base64String
              )

              // TODO: Implement logic for posting error
              if (imageResult.success && imageResult.data?.content?.path) {
                // Convert 'public/assets/...' to '/assets/...'
                const webPath = `/${imageResult.data.content.path.replace(/^public\//, "")}`
                rawText = rawText.replaceAll(blobUrl, webPath)
                delete pendingImages.current[blobUrl]
                URL.revokeObjectURL(blobUrl)
              } else {
                failedImages.push(file.name)
                toast.error(`Upload failed for ${file.name}.`)
              }
            } catch (e) {
              failedImages.push(file.name)
            } finally {
              // something....maybe a modal appears
            }
          }
        }
        mdRef.current?.setText(rawText)
        // if some images were failed to upload, cancel the whole post upload
        if (failedImages.length > 0) {
          toast.error(`Cancelled posting.`)
          return
        }

        const postResult = await uploadPostToGithub(
          postTitle,
          rawText,
          `Publish: ${data.title}`
        )
        if (postResult.success) {
          toast.success("Published successfully.")
          cleanBlobs(pendingImages.current)
        } else {
          toast.error(`Error: ${postResult.error}`)
        }
      } catch (e) {
        console.error("Critical error during post:", e)
      }
    })
  }
  return (
    <div>
      <MdEditor
        ref={mdRef}
        className={`bg-black`}
        style={{ height: "800px" }}
        onImageUpload={handleImageUpload}
        renderHTML={text => <RenderMarkdown plain>{text}</RenderMarkdown>}
      />
      <Button disabled={isPending} onClick={handleSubmit}>
        {isPending ? "Posting..." : "Post Article"}
      </Button>
    </div>
  )
}
