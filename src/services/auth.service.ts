import { http } from './http'
import type { AuthUser, LoginPayload } from '@/types'

export interface LoginResponse {
  token: string
  user: AuthUser
}

export const authService = {
  login(payload: LoginPayload) {
    return http.post<LoginResponse>('/auth/login', payload).then((res) => res.data)
  },
  logout() {
    return http.post('/auth/logout')
  }
}
