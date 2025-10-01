"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/src/lib/auth"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard")
    } else {
      router.replace("/login")
    }
  }, [router])

  return <p className="text-center mt-10">Redirecting...</p>
}
