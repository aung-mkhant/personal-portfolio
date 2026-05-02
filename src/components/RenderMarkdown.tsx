import Markdown, { Options } from "react-markdown"
import Image from "next/image"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import rehypePrism from "rehype-prism-plus"
import rehypeUnwrapImages from "rehype-unwrap-images"
import rehypeCodeTitles from "rehype-code-titles"
import React from "react"

// render HTML from markdown input
export default function RenderMarkdown({
  children,
  plain,
  ...rest
}: Omit<Options, "children"> & {
  children: string
  plain?: boolean
}) {
  // This is used to check priority on Image if it's the first image to be rendered
  let imageCount = 0
  // when plain attr is passed, we just render as normal html elements, no react components
  // const defaultComponents: Options["components"] = plain
  //   ? {}
  //   : {
  //       img: ({ src, alt }) => {
  //         if (!src) return null
  //         const isFirstImage = imageCount === 0
  //         imageCount++
  //
  //         // my-8 md:px-8 py-24
  //         return (
  //           <div className="relative my-8 aspect-video w-full py-8">
  //             <Image
  //               src={src.toString() || ""}
  //               alt={alt || ""}
  //               fill
  //               className="object-cover"
  //               priority={isFirstImage}
  //             />
  //           </div>
  //         )
  //       },
  //       h1: ({ children }) => (
  //         <h1 className="mb-4 text-4xl font-bold text-white">{children}</h1>
  //       ),
  //       h2: ({ children }) => (
  //         <h2 className="mt-10 mb-4 py-4 font-young-serif text-3xl">
  //           {children}
  //         </h2>
  //       ),
  //       h3: ({ children }) => (
  //         <h3 className="font-literata text-2xl font-bold italic md:text-3xl">
  //           {children}
  //         </h3>
  //       ),
  //       p: ({ children }) => (
  //         <p className="my-4 py-2 font-literata text-lg leading-relaxed font-medium xl:text-xl">
  //           {children}
  //         </p>
  //       ),
  //       a: ({ children }) => (
  //         <a
  //           className="text-link underline-offset-2 hover:underline"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           {children}
  //         </a>
  //       )
  //     }
  const defaultComponents: Options["components"] = plain
    ? {}
    : {
        img: ({ src, alt }) => {
          if (!src) return null
          const isFirstImage = imageCount === 0
          imageCount++

          return (
            /* Use responsive margin: my-6 for mobile, md:my-12 for desktop */
            <div className="relative mx-auto h-[250px] w-full overflow-hidden md:h-[450px] dark:bg-zinc-800">
              <Image
                src={src.toString()}
                alt={alt || ""}
                fill
                className="object-contain object-center"
                priority={isFirstImage}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )
        }
      }

  return (
    <>
      <Markdown
        urlTransform={url => url}
        remarkPlugins={[remarkGfm, remarkFrontmatter]}
        rehypePlugins={[
          rehypeUnwrapImages,
          rehypeCodeTitles,
          [rehypePrism, { showLineNumbers: true, ignoreMissing: true }]
        ]}
        components={{
          ...defaultComponents,
          ...rest.components
        }}
        {...rest}
      >
        {children}
      </Markdown>
    </>
  )
}
