import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useAuthStore } from '@/stores/auth'
import type { FraudAlertSummary } from './admin.service'

/**
 * Connexion temps reel au backend (STOMP over SockJS) pour les notifications
 * admin : nouvelles alertes de fraude, evenements de compte (gel/suspension).
 */
export function createAdminSocket(handlers: {
  onFraudAlert?: (alert: FraudAlertSummary) => void
  onAccountEvent?: (event: { accountRef: string; eventType: string; detail: string }) => void
}) {
  const auth = useAuthStore()
  const wsBase = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api').replace(/\/api$/, '')

  const client = new Client({
    webSocketFactory: () => new SockJS(`${wsBase}/ws`),
    connectHeaders: auth.token ? { Authorization: `Bearer ${auth.token}` } : {},
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe('/topic/fraud-alerts', (msg) => {
        handlers.onFraudAlert?.(JSON.parse(msg.body))
      })
      client.subscribe('/topic/account-events', (msg) => {
        handlers.onAccountEvent?.(JSON.parse(msg.body))
      })
    }
  })

  client.activate()
  return client
}
