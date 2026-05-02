"use client"
import { authenticate } from "@/app/actions/auth"
import { useActionState, useEffect, useRef } from "react"
import { AuthFormState } from "@/lib/definitions"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/Input"
import Form from "next/form"

export default function AuthForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    authenticate,
    undefined
  )
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])
  const hasError = !!state?.errors?.password
  return (
    <div className={cn("px-8 py-8", className)}>
      <Form action={action}>
        <Input
          ref={inputRef}
          aria-label="password"
          className="mb-6"
          id="password"
          placeholder="Enter Password"
          name="password"
          type="password"
          required={true}
        />

        <span className={cn(`${hasError && "text-red-600"}`, "")}>
          {state?.errors?.password && <p>{state.errors.password}</p>}
        </span>
        <Button type="submit" disabled={pending} className="mx-auto block">
          Login
        </Button>
      </Form>
    </div>
  )
}
