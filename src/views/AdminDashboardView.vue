<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const alerts = [
  { id: 'TXN-8842', user: 'C1231006815', amount: 4300, risk: 92 },
  { id: 'TXN-8850', user: 'C1789456123', amount: 9800, risk: 88 }
]
</script>

<template>
  <main class="min-h-screen bg-background">
    <header class="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-20 bg-surface border-b border-outline-variant/40">
      <div class="flex items-center gap-sm">
        <span class="material-symbols-outlined text-primary text-3xl font-bold">shield_with_heart</span>
        <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">
          SecureTrans Admin
        </span>
      </div>
      <nav class="flex items-center gap-lg">
        <RouterLink to="/admin/urgence" class="font-body-md text-body-md text-danger font-bold hover:underline">
          Actions d'urgence
        </RouterLink>
        <button
          class="h-10 px-md border border-outline-variant rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low"
          @click="auth.logout(); $router.push('/connexion')"
        >
          Déconnexion
        </button>
      </nav>
    </header>

    <section class="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <h1 class="font-headline-lg text-headline-lg text-on-surface mb-lg">
        Alertes de fraude en attente
      </h1>

      <div class="bg-surface rounded-xl shadow-level-1 border border-outline-variant/30 divide-y divide-outline-variant/20">
        <div
          v-for="alert in alerts"
          :key="alert.id"
          class="p-lg flex items-center justify-between flex-wrap gap-md"
        >
          <div>
            <p class="font-title-md text-title-md text-on-surface">{{ alert.id }}</p>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Compte {{ alert.user }} ·
              {{ alert.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
            </p>
          </div>
          <div class="flex items-center gap-md">
            <span class="px-md py-xs rounded-full bg-danger/10 text-danger font-label-sm text-label-sm">
              Risque {{ alert.risk }}%
            </span>
            <RouterLink
              :to="`/analyse-ia/${alert.id}`"
              class="h-10 px-md inline-flex items-center border border-outline-variant rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low"
            >
              Examiner
            </RouterLink>
            <RouterLink
              to="/admin/urgence"
              class="h-10 px-md inline-flex items-center bg-danger text-white rounded-lg font-label-sm text-label-sm hover:opacity-90"
            >
              Geler le compte
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
