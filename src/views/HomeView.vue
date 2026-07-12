<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <main class="min-h-screen bg-background">
    <header class="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-20 bg-surface border-b border-outline-variant/40">
      <div class="flex items-center gap-sm">
        <span class="material-symbols-outlined text-primary text-3xl font-bold">account_balance_wallet</span>
        <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">SecureTrans</span>
      </div>
      <nav class="flex items-center gap-md">
        <RouterLink
          v-if="!auth.isAuthenticated"
          to="/connexion"
          class="h-11 px-lg inline-flex items-center bg-primary text-white rounded-lg font-title-md hover:bg-primary-container transition-all"
        >
          Se connecter
        </RouterLink>
        <RouterLink
          v-else
          to="/tableau-de-bord"
          class="h-11 px-lg inline-flex items-center bg-primary text-white rounded-lg font-title-md hover:bg-primary-container transition-all"
        >
          Mon tableau de bord
        </RouterLink>
      </nav>
    </header>

    <section class="max-w-4xl mx-auto text-center py-xl px-margin-mobile">
      <h1 class="font-display-lg text-display-lg text-on-surface mb-md tracking-tight">
        La détection de fraude par IA, en temps réel.
      </h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-xl">
        SecureTrans évalue chaque transaction en temps réel et bloque automatiquement les
        opérations à risque, pour une tranquillité d'esprit totale.
      </p>
      <RouterLink
        to="/connexion"
        class="inline-flex items-center gap-sm h-12 px-xl bg-primary text-white font-title-md rounded-lg shadow-md hover:bg-primary-container transition-all"
      >
        Accéder à mon compte
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </RouterLink>
    </section>

    <section class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-lg px-margin-mobile pb-xl">
      <article class="bg-surface rounded-lg p-lg shadow-level-1 border border-outline-variant/30">
        <span class="material-symbols-outlined text-primary text-3xl mb-sm">bolt</span>
        <h3 class="font-title-md text-title-md text-on-surface mb-xs">Analyse instantanée</h3>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Chaque transaction reçoit un score de risque calculé en quelques millisecondes.
        </p>
      </article>
      <article class="bg-surface rounded-lg p-lg shadow-level-1 border border-outline-variant/30">
        <span class="material-symbols-outlined text-primary text-3xl mb-sm">shield_with_heart</span>
        <h3 class="font-title-md text-title-md text-on-surface mb-xs">Blocage automatique</h3>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Les opérations frauduleuses sont bloquées avant d'impacter votre compte.
        </p>
      </article>
      <article class="bg-surface rounded-lg p-lg shadow-level-1 border border-outline-variant/30">
        <span class="material-symbols-outlined text-primary text-3xl mb-sm">insights</span>
        <h3 class="font-title-md text-title-md text-on-surface mb-xs">Supervision admin</h3>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Des outils d'urgence pour geler, suspendre ou annuler en un clic.
        </p>
      </article>
    </section>
  </main>
</template>
