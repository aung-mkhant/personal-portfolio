import Navigation from "@/components/layout/Navigation"
import "../globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import Footer from "@/components/layout/Footer"
import React from "react"
import { Metadata } from "next"
import { Toaster } from "react-hot-toast"
import ThemeButton from "@/components/layout/ThemeButton"
import NavLink from "@/components/layout/NavLink"

export const metadata: Metadata = {
  title: "Amk's Portfolio",
  description: "Portfolio of Aung Min Khant"
}
export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col px-4">
      <header>
        <Navigation className="min-h-10 py-4 sm:min-h-14 md:py-6">
          <NavLink text="Home" path="/" />
          <NavLink text="Blog" path="/blog" />
          <NavLink text="Contact Me" path="/contact" />
          <ThemeButton />
        </Navigation>
      </header>
      <main className="mx-auto w-full max-w-3xl">{children}</main>
      <Toaster
        toastOptions={{
          position: "top-center",
          duration: 5000
        }}
      />
      <GoogleAnalytics gaId="G-46B83GC0TG" />

      <Footer className="mx-auto min-h-10 w-full max-w-3xl py-8 sm:min-h-14 md:py-10 lg:py-12" />
    </div>
  )
}
