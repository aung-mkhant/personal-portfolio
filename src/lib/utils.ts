import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
// twMerge deletes overlapping classes
// clsx is used to conditionally join classNames together
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return dayjs(date).format("MMMM D, YYYY")
}

export function fileToBase64(file: File): Promise<string> {
  // Change image to base64 string
  const reader = new FileReader()
  return new Promise(resolve => {
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1] // remove metadata
      resolve(base64)
    }
    reader.readAsDataURL(file)
  })
}
