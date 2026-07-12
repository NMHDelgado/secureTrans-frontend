<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import DepositModal from '@/components/modals/DepositModal.vue'
import WithdrawModal from '@/components/modals/WithdrawModal.vue'
import type { DepositPayload, WithdrawPayload } from '@/types'

const auth = useAuthStore()

const balance = ref(24580.42)
const showDeposit = ref(false)
const showWithdraw = ref(false)
const feedback = ref('')

function handleDeposit(payload: DepositPayload) {
  balance.value += payload.amount
  feedback.value = `Dépôt de ${payload.amount.toLocaleString('fr-FR')} € en cours de traitement.`
  showDeposit.value = false
}

function handleWithdraw(payload: WithdrawPayload) {
  balance.value -= payload.amount
  feedback.value = `Retrait de ${payload.amount.toLocaleString('fr-FR')} € en cours de traitement.`
  showWithdraw.value = false
}
</script>

<template>
  <main class="min-h-screen bg-background">
    <header class="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-20 bg-surface border-b border-outline-variant/40">
      <div class="flex items-center gap-sm">
        <span class="material-symbols-outlined text-primary text-3xl font-bold">account_balance_wallet</span>
        <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">SecureTrans</span>
      </div>
      <nav class="flex items-center gap-lg">
        <RouterLink to="/transactions" class="font-body-md text-body-md text-on-surface-variant hover:text-primary">
          Historique
        </RouterLink>
        <span class="font-body-md text-body-md text-on-surface-variant">{{ auth.user?.email }}</span>
        <button
          class="h-10 px-md border border-outline-variant rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low"
          @click="auth.logout(); $router.push('/connexion')"
        >
          Déconnexion
        </button>
      </nav>
    </header>

    <section class="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <p v-if="feedback" class="mb-lg p-md rounded-lg bg-success/10 text-success font-body-md text-body-md">
        {{ feedback }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
        <div class="md:col-span-2 bg-surface rounded-xl p-lg shadow-level-1 border border-outline-variant/30">
          <p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-xs">Solde disponible</p>
          <p class="font-display-lg text-display-lg text-on-surface tabular-nums">
            {{ balance.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' }) }}
          </p>
          <div class="flex gap-md mt-lg">
            <button
              class="flex-1 h-12 bg-primary text-white rounded-lg font-title-md flex items-center justify-center gap-sm hover:bg-primary-container transition-all"
              @click="showDeposit = true"
            >
              <span class="material-symbols-outlined text-sm">add_circle</span>
              Déposer
            </button>
            <button
              class="flex-1 h-12 border border-outline-variant text-on-surface rounded-lg font-title-md flex items-center justify-center gap-sm hover:bg-surface-container-low transition-all"
              @click="showWithdraw = true"
            >
              <span class="material-symbols-outlined text-sm">north_east</span>
              Retirer
            </button>
          </div>
        </div>

        <div class="bg-surface rounded-xl p-lg shadow-level-1 border border-outline-variant/30 flex flex-col justify-center items-center text-center">
          <span class="material-symbols-outlined text-success text-4xl mb-sm">verified_user</span>
          <p class="font-title-md text-title-md text-on-surface">Compte sécurisé</p>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Surveillance de fraude par IA active
          </p>
        </div>
      </div>

      <div class="bg-surface rounded-xl p-lg shadow-level-1 border border-outline-variant/30">
        <div class="flex items-center justify-between mb-md">
          <h2 class="font-title-md text-title-md text-on-surface">Transactions récentes</h2>
          <RouterLink to="/transactions" class="font-label-sm text-label-sm text-primary hover:underline">
            Voir tout
          </RouterLink>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Consultez l'historique complet de vos opérations dans la section dédiée.
        </p>
      </div>
    </section>

    <DepositModal v-if="showDeposit" @close="showDeposit = false" @submit="handleDeposit" />
    <WithdrawModal
      v-if="showWithdraw"
      :available-balance="balance"
      @close="showWithdraw = false"
      @submit="handleWithdraw"
    />
  </main>
</template>
