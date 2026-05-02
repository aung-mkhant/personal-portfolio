import Highlighted from "@/components/ui/Highlighted"
import Separator from "@/components/ui/Separator"
import { Button } from "@/components/ui/Button"
import { getLatestPosts } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"
import Card from "@/components/ui/Card"
import React, { Suspense } from "react"
import Section from "@/components/layout/Section"
import Posts from "@/components/Posts"

export default async function HomePage() {
  const posts = getLatestPosts(3)
  return (
    <>
      <Section>
        <h1 className="mb-12 text-center font-young-serif text-2xl font-bold md:text-3xl lg:text-4xl">
          <Highlighted>Welcome</Highlighted>, Visitors...
        </h1>
        <div className="relative mx-auto mb-12 aspect-square w-full max-w-72 md:max-w-96">
          <Image
            src="/assets/author/amk.JPEG"
            fill
            className="rounded-full object-cover"
            alt="author - Aung Min Khant"
            sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 400px"
            priority
          />
        </div>
        <p className="mx-auto max-w-xl font-literata text-base leading-relaxed md:text-lg lg:text-xl">
          I&#39;m <Highlighted>Aung</Highlighted>, a{" "}
          <Highlighted>Full-stack Developer</Highlighted> with a passion for
          art. I <Highlighted>love exploring</Highlighted> new technologies and
          coming up with creative ideas. This project was created as a space for
          me to <Highlighted>document and share</Highlighted> what I learn while
          navigating the <Highlighted>tech space</Highlighted>.
        </p>
      </Section>

      <Separator />

      <Section>
        <h2 className="mb-12 text-center font-young-serif text-2xl font-bold md:text-3xl lg:text-4xl">
          What to <Highlighted>expect?</Highlighted>
        </h2>

        <Skills />
      </Section>

      <Separator />

      <Section>
        <h3 className="mb-12 text-xl font-bold italic md:text-2xl lg:text-3xl">
          Projects
        </h3>
        <p className="font-literata text-base md:text-lg">
          🚧🚧 Projects section is still being worked on. Meanwhile, check out
          my posts section. 👇🏻
        </p>
      </Section>

      <Separator />

      <Section>
        <h3 className="mb-6 text-xl font-bold italic md:mb-8 md:text-2xl lg:text-3xl">
          Writing
        </h3>
        <Suspense fallback={<p className="mt-8">Loading posts...</p>}>
          <Posts posts={posts} />
        </Suspense>
        <Link href="/blog" passHref>
          <Button>View All Posts</Button>
        </Link>
      </Section>
    </>
  )
}

function Skills() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col flex-wrap items-center gap-5 md:flex-row md:justify-center">
      <Card
        className=""
        imgSrc="/assets/flaticons/book-pile.png"
        imgAlt="research"
      >
        My <Highlighted>takes</Highlighted> on the projects I've done and those
        I'm planning to do.
      </Card>
      <Card
        className=""
        imgSrc="/assets/flaticons/math-book.png"
        imgAlt="math-book"
      >
        <Highlighted>Brief and concise</Highlighted> write-ups without
        sacrificing clarity. No unnecessary noise.
      </Card>
      <Card imgSrc="/assets/flaticons/teamwork.png" imgAlt="programming">
        <Highlighted>Technical and non-technical topics</Highlighted> presented
        in an effective, <Highlighted>non-boring</Highlighted> way.
      </Card>
    </div>
  )
}
