import "server-only"
import { JWTPayload, jwtVerify, SignJWT } from "jose"
import { SessionPayload } from "@/lib/definitions"
import { cookies } from "next/headers"
import { cache } from "react"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    return { isAuth: false }
  }
  return { isAuth: true, userId: session.userId }
})

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set("session", session, {
    httpOnly: true,
    // secure:true will send cookie only via https
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  })
}
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(
  session: string | undefined = ""
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"]
    })
    return payload
  } catch (e) {
    return null
  }
}
