<script setup lang="ts">
import { ref } from 'vue'
import type { Transaction } from '@/types'

const transactions = ref<Transaction[]>([
  {
    id: 'TXN-8841',
    type: 'deposit',
    amount: 1200,
    status: 'success',
    riskScore: 4,
    createdAt: '2026-07-08',
    nameOrig: 'C1231006815',
    nameDest: 'M1979787155'
  },
  {
    id: 'TXN-8842',
    type: 'withdrawal',
    amount: 4300,
    status: 'blocked',
    riskScore: 92,
    createdAt: '2026-07-09',
    nameOrig: 'C1231006815',
    nameDest: 'M2044282225'
  },
  {
    id: 'TXN-8843',
    type: 'transfer',
    amount: 850,
    status: 'pending',
    riskScore: 46,
    createdAt: '2026-07-10',
    nameOrig: 'C1231006815',
    nameDest: 'M1230701703'
  }
])

const statusStyles: Record<Transaction['status'], string> = {
  success: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  blocked: 'bg-danger/10 text-danger'
}

const statusLabels: Record<Transaction['status'], string> = {
  success: 'Réussie',
  pending: 'En cours',
  blocked: 'Bloquée'
}
</script>

<template>
  <main class="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-xl">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between mb-lg">
        <h1 class="font-headline-lg text-headline-lg text-on-surface">Historique des transactions</h1>
        <RouterLink to="/tableau-de-bord" class="font-label-sm text-label-sm text-primary hover:underline">
          Retour au tableau de bord
        </RouterLink>
      </div>

      <div class="bg-surface rounded-xl shadow-level-1 border border-outline-variant/30 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-surface-container-low">
            <tr class="font-label-sm text-label-sm text-on-surface-variant uppercase">
              <th class="p-md">Référence</th>
              <th class="p-md">Type</th>
              <th class="p-md">Montant</th>
              <th class="p-md">Score de risque</th>
              <th class="p-md">Statut</th>
              <th class="p-md">Date</th>
              <th class="p-md"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="txn in transactions"
              :key="txn.id"
              class="border-t border-outline-variant/20 hover:bg-surface-container-low transition-colors"
            >
              <td class="p-md font-body-md text-body-md font-bold">{{ txn.id }}</td>
              <td class="p-md font-body-md text-body-md capitalize">{{ txn.type }}</td>
              <td class="p-md font-body-md text-body-md tabular-nums">
                {{ txn.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
              </td>
              <td class="p-md font-body-md text-body-md tabular-nums">{{ txn.riskScore }}%</td>
              <td class="p-md">
                <span
                  class="px-sm py-xs rounded-full font-label-sm text-label-sm"
                  :class="statusStyles[txn.status]"
                >
                  {{ statusLabels[txn.status] }}
                </span>
              </td>
              <td class="p-md font-body-md text-body-md text-on-surface-variant">{{ txn.createdAt }}</td>
              <td class="p-md">
                <RouterLink
                  :to="`/analyse-ia/${txn.id}`"
                  class="font-label-sm text-label-sm text-primary hover:underline"
                >
                  Analyser
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
