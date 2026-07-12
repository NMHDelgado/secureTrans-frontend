export type UserRole = 'user' | 'admin'

export interface AuthUser {
  id: string
  fullName: string
  email: string
  role: UserRole
}

export type TransactionStatus = 'pending' | 'success' | 'blocked'
export type TransactionType = 'deposit' | 'withdrawal' | 'transfer'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  status: TransactionStatus
  riskScore: number
  createdAt: string
  nameOrig: string
  nameDest: string
}

export interface LoginPayload {
  email: string
  password: string
  remember: boolean
}

export interface DepositPayload {
  paymentMethod: 'card' | 'transfer'
  currency: string
  amount: number
}

export interface WithdrawPayload {
  destinationAccount: string
  amount: number
}
