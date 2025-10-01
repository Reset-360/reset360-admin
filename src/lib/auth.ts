import { ACCESS_TOKEN } from '../constants/storage-keys'

// Replace this with API calls or NextAuth
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!sessionStorage.getItem(ACCESS_TOKEN)
}

export function loginUser(token: string) {
  sessionStorage.setItem(ACCESS_TOKEN, token)
}

export function logoutUser() {
  sessionStorage.removeItem(ACCESS_TOKEN)
  window.location.href = "/login"
}
