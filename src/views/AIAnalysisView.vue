<script setup lang="ts">
defineProps<{
  transactionId: string
}>()

const riskScore = 78
</script>

<template>
  <main class="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-xl">
    <div class="max-w-3xl mx-auto">
      <RouterLink to="/transactions" class="font-label-sm text-label-sm text-primary hover:underline">
        &larr; Retour à l'historique
      </RouterLink>

      <h1 class="font-headline-lg text-headline-lg text-on-surface mt-md mb-lg">
        Analyse IA — {{ transactionId }}
      </h1>

      <div class="bg-surface rounded-xl shadow-level-1 border border-outline-variant/30 p-lg mb-lg">
        <p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-xs">Score de risque</p>
        <div class="flex items-center gap-md">
          <div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
            <div
              class="h-full rounded-full"
              :class="riskScore > 70 ? 'bg-danger' : riskScore > 40 ? 'bg-warning' : 'bg-success'"
              :style="{ width: riskScore + '%' }"
            />
          </div>
          <span class="font-title-md text-title-md text-on-surface tabular-nums">{{ riskScore }}%</span>
        </div>
      </div>

      <div class="bg-surface rounded-xl shadow-level-1 border border-outline-variant/30 p-lg">
        <h2 class="font-title-md text-title-md text-on-surface mb-md">Facteurs de risque identifiés</h2>
        <ul class="space-y-sm font-body-md text-body-md text-on-surface-variant list-disc list-inside">
          <li>Montant significativement supérieur à la moyenne habituelle du compte.</li>
          <li>Compte destinataire créé récemment.</li>
          <li>Transaction initiée depuis une localisation inhabituelle.</li>
        </ul>
      </div>
    </div>
  </main>
</template>
