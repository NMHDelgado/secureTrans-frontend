import { http } from './http'
import type { Transaction } from '@/types'

export interface FraudAlertSummary {
  alertId: string
  transactionId: string
  nameOrig: string
  nameDest: string
  amount: number
  riskScore: number
  status: string
  createdAt: string
}

export const adminService = {
  globalJournal() {
    return http.get<Transaction[]>('/admin/transactions').then((res) => res.data)
  },
  fraudAlerts() {
    return http.get<FraudAlertSummary[]>('/admin/fraud-alerts').then((res) => res.data)
  },
  freezeAccount(accountRef: string) {
    return http.post('/admin/accounts/freeze', { accountRef })
  },
  suspendAccount(accountRef: string) {
    return http.post('/admin/accounts/suspend', { accountRef })
  },
  reactivateAccount(accountRef: string) {
    return http.post('/admin/accounts/reactivate', { accountRef })
  },
  forceTransaction(transactionId: string) {
    return http.post(`/admin/transactions/${transactionId}/force`)
  },
  cancelTransaction(transactionId: string) {
    return http.post(`/admin/transactions/${transactionId}/cancel`)
  }
}
