'use client'

import { useRouter } from 'next/navigation'
import api from '@/src/lib/axios'
import { logoutUser } from '@/src/lib/auth'

export default function useLogout() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
       await api.post(`/auth/logout`, {}, {
        withCredentials: true, 
      })

      logoutUser()
      router.replace('/login')
    } catch (err) {
      console.error('Logout failed:', err)
      logoutUser() 
      router.replace('/login')
    }
  }

  return handleLogout
}
