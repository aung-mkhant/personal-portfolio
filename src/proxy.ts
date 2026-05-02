import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt } from "@/lib/session"

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  // Store the current URL in a custom header
  requestHeaders.set("x-url", request.nextUrl.pathname)
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    // 3. Decrypt the session from the cookie
    const cookie = request.cookies.get("session")
    const session = await decrypt(cookie?.value)

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/admin/login", request.nextUrl))
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

// exclude public assets from middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
