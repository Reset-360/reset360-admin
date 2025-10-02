import { ACCESS_TOKEN } from '../constants/storage-keys';
import useAuthStore from '../store/AuthState';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const user = useAuthStore.getState().user;
  return !!user && !!localStorage.getItem(ACCESS_TOKEN);
}

export function loginUser(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function logoutUser() {
  const clearUser = useAuthStore.getState().clearUser;
  clearUser();

  localStorage.removeItem(ACCESS_TOKEN);
  window.location.href = '/login';
}
