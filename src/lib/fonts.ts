import { Literata, Young_Serif } from "next/font/google"

export const youngSerif = Young_Serif({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-young-serif"
})

export const literata = Literata({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-literata"
})
