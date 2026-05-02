import React from "react"

export default function Highlighted({
  children
}: {
  children: React.ReactNode
}) {
  return <span className="bg-highlight">{children}</span>
}
