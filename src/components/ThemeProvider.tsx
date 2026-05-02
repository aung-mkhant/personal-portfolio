"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps
} from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return children

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
