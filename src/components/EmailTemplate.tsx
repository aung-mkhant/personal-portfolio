import * as React from "react"
import { Html, Text, Link } from "@react-email/components"

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <Html lang={"en"}>
      <Text>{message}</Text>
      <Text style={{ fontStyle: "italic" }}>
        Message sent by <Link href={`mailto:${email}`}>{name}</Link>
      </Text>
    </Html>
  )
}
