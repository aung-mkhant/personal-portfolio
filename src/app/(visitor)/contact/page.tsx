import ContactForm from "@/components/ContactForm"
import React from "react"

export default function AboutPage() {
  return (
    <div className="py-10 md:py-12 lg:py-14">
      <h3 className="mb-6 text-xl font-bold italic md:mb-8 md:text-2xl lg:text-3xl">
        Let&#39;s get in touch!
      </h3>
      <ContactForm />
      {/*<div className="social-card font-serif text-lg">*/}
      {/*  <p className="text-xl font-bold font-literata">Email Address:</p>*/}
      {/*  <Link href="mailto:amk.never.gives.up@gmail.com">*/}
      {/*    <span className="underline underline-offset-2 font-young-serif mt-1">*/}
      {/*      amk.never.gives.up@gmail.com*/}
      {/*    </span>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </div>
  )
}
