import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

/**
 * Client HTTP central pour toutes les communications avec le backend Spring Boot.
 * Injecte automatiquement le JWT et gere la deconnexion en cas de token expire/invalide.
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://securetrans.onrender.com'  //'http://localhost:8080/api',
  timeout: 10000
})

http.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const auth = useAuthStore()
      auth.logout()
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)
