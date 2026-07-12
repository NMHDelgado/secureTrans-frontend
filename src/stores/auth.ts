import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthUser, LoginPayload } from '@/types'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(
    localStorage.getItem('securetrans_token') ?? sessionStorage.getItem('securetrans_token')
  )

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  /** Authentification reelle contre le backend Spring Boot (POST /api/auth/login). */
  async function login(payload: LoginPayload): Promise<void> {
    console.log(payload);
    
    const { token: jwt, user: authenticatedUser } = await authService.login(payload)

    console.log(jwt, authenticatedUser);

    user.value = authenticatedUser
    token.value = jwt

    if (payload.remember) {
      localStorage.setItem('securetrans_token', jwt)
    } else {
      sessionStorage.setItem('securetrans_token', jwt)
    }
  }

  function logout(): void {
    authService.logout().catch(() => undefined) // best-effort, on nettoie l'etat local dans tous les cas
    user.value = null
    token.value = null
    localStorage.removeItem('securetrans_token')
    sessionStorage.removeItem('securetrans_token')
  }

  return { user, token, isAuthenticated, isAdmin, login, logout }
})
