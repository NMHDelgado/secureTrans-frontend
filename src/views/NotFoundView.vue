<script setup lang="ts"></script>

<template>
  <main class="min-h-screen bg-background flex flex-col items-center justify-center text-center px-md">
    <span class="material-symbols-outlined text-primary text-6xl mb-md">error</span>
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-sm">Page introuvable</h1>
    <p class="font-body-md text-body-md text-on-surface-variant mb-lg">
      La page que vous recherchez n'existe pas ou a été déplacée.
    </p>
    <RouterLink
      to="/"
      class="h-12 px-lg inline-flex items-center bg-primary text-white rounded-lg font-title-md hover:bg-primary-container transition-all"
    >
      Retour à l'accueil
    </RouterLink>
  </main>
</template>
