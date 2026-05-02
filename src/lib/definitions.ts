export type AuthFormState =
  | {
      errors?: {
        password?: string[]
      }
      message?: string
    }
  | undefined

export type ContactFormState =
  | {
      data?: {
        name: string
        email: string
        message: string
      }
      errors?: {
        name?: string[]
        email?: string[]
        message?: string[]
        resend?: string
      }
      message?: string | null
    }
  | undefined

export type SessionPayload = {
  userId: string
  expiresAt: Date
}
