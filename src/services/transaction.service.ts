import { http } from './http'
import type { DepositPayload, WithdrawPayload, Transaction } from '@/types'

export interface TransactionResult {
  id: string
  status: 'pending' | 'success' | 'blocked'
  riskScore: number
  message: string
  createdAt: string
}

export const transactionService = {
  deposit(payload: DepositPayload) {
    return http
      .post<TransactionResult>('/transactions', {
        type: 'CASH_IN',
        amount: payload.amount,
        destinationAccountRef: 'SELF'
      })
      .then((res) => res.data)
  },
  withdraw(payload: WithdrawPayload) {
    return http
      .post<TransactionResult>('/transactions', {
        type: 'CASH_OUT',
        amount: payload.amount,
        destinationAccountRef: payload.destinationAccount
      })
      .then((res) => res.data)
  },
  myHistory() {
    return http.get<Transaction[]>('/transactions/me').then((res) => res.data)
  }
}
