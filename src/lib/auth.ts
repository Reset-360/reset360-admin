import { ACCESS_TOKEN, AUTH_ROLE } from '../constants/storage-keys';
import useAuthStore from '../store/AuthState';
import { Role } from '../types/statusTypes';

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

export function setUserRole(role: string) {
  localStorage.setItem(AUTH_ROLE, role);
}

export function getUserRole(role: string): Role {
  return localStorage.getItem(AUTH_ROLE) as Role;
}