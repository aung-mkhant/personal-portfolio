"use client"
import { ContactFormState } from "@/lib/definitions"
import { useActionState, useEffect } from "react"
import { sendEmail } from "@/app/actions/email"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import toast from "react-hot-toast"
import React from "react"

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactFormState, FormData>(
    sendEmail,
    undefined
  )
  useEffect(() => {
    if (!state) return

    if (state.message === "Success") {
      toast.success("Successfully sent the message")
    }

    if (state.errors?.resend) {
      toast.error("Error sending the message")
      console.log(state.errors.resend)
    }
  }, [state])
  return (
    <>
      <form
        action={action}
        className="flex flex-col gap-4 py-4 md:py-6 lg:gap-6 lg:py-8"
      >
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="name"
            className={cn(
              state?.errors?.name && "text-red-600",
              "text-base md:text-lg"
            )}
          >
            Name
          </Label>
          <Input
            defaultValue={state?.data?.name}
            aria-label="name"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            className={cn(
              "text-base transition-all placeholder:text-sm md:text-lg md:placeholder:text-base",
              state?.errors?.name && "border-red-600 focus-visible:ring-red-600"
            )}
          />
          {state?.errors?.name && (
            <p
              className="animate-in fade-in slide-in-from-top-1 text-sm font-medium text-red-600"
              aria-live="polite"
            >
              {state?.errors?.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className={cn(
              state?.errors?.email && "text-red-600",
              "text-base md:text-lg"
            )}
          >
            Email Address
          </Label>
          <Input
            defaultValue={state?.data?.email}
            aria-label="email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className={cn(
              "text-base transition-all placeholder:text-sm md:text-lg md:placeholder:text-base",
              state?.errors?.email &&
                "border-red-600 focus-visible:ring-red-600"
            )}
          />
          {state?.errors?.email && (
            <p className="animate-in fade-in slide-in-from-top-1 text-sm font-medium text-red-600">
              {state?.errors?.email}
            </p>
          )}
        </div>
        <div className="sr-only" aria-hidden="true">
          <input
            defaultValue={state?.data?.message}
            type="text"
            name="fax_number"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="message"
            className={cn(
              state?.errors?.message && "text-red-600",
              "text-sm md:text-base"
            )}
          >
            Message
          </Label>
          <Textarea
            defaultValue={state?.data?.message}
            placeholder="Type your message here."
            id="message"
            name="message"
            rows={9}
            aria-label="message"
            required
            className={cn(
              "text-base transition-all placeholder:text-sm md:text-lg md:placeholder:text-base",
              state?.errors?.message &&
                "border-red-600 focus-visible:ring-red-600"
            )}
          />
          {state?.errors?.message && (
            <p className="animate-in slide-in-from-top-1 text-sm font-medium text-red-600">
              {state.errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="mx-auto block w-auto"
        >
          {pending ? "Sending..." : "Submit"}
        </Button>
      </form>
    </>
  )
}
