"use server"
import { Resend } from "resend"
import { EmailTemplate } from "@/components/EmailTemplate"
import { ContactFormState } from "@/lib/definitions"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.")
})
// Receives emails to your email_address
export async function sendEmail(
  state: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing Resend API key in .env")
  }
  const honeypot = formData.get("fax_number")
  if (honeypot) {
    return { message: "Success" } // Fake success for bots
  }

  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string
  }
  const validatedFields = schema.safeParse(rawData)
  if (!validatedFields.success) {
    return {
      data: rawData,
      errors: validatedFields.error.flatten().fieldErrors
    }
  }
  const { name, email, message } = validatedFields.data
  try {
    const { error } = await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      to: [process.env.RESEND_TARGET_EMAIL || "example.com"],
      replyTo: email,
      subject: `Message from ${email}`,
      react: EmailTemplate({ name, email, message })
    })

    if (error) {
      console.log(error.message)
      return {
        message: "Failed to send email",
        errors: { resend: error.message }
      }
    }

    return { message: "Success" }
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    return {
      message: "A technical error occurred.",
      errors: { resend: "Internal Server Error" }
    }
  }
}
