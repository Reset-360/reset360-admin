'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logoutUser } from './auth'
import { Role } from '../types/statusTypes'
import { AUTH_ROLE } from '../constants/storage-keys'
import LoadingSpinner from '../components/layout/loader-spinner'
import useLogout from '../hooks/useLogout'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const logout = useLogout();

  const [authorized, setAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    const role = localStorage.getItem(AUTH_ROLE)

    if (isAuthenticated() && role === Role.ADMIN) {
      setAuthorized(true)
    } else {
      logout() // logout on api

      logoutUser()
      setAuthorized(false)

      router.replace('/login')
    }
  }, [router, logout])

  if (authorized === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!authorized) return null

  return <>{children}</>
}
