<script setup lang="ts">
import { reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { validationMessages } from '@/validations/rules'

type EmergencyAction = 'freeze' | 'suspend' | 'force_reversal'

const form = reactive<{ accountId: string; action: EmergencyAction; reason: string }>({
  accountId: '',
  action: 'freeze',
  reason: ''
})

const rules = {
  accountId: {
    required: helpers.withMessage(validationMessages.required, required)
  },
  reason: {
    required: helpers.withMessage(validationMessages.required, required)
  }
}

const v$ = useVuelidate(rules, form)
const confirmation = ref('')

async function onSubmit() {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  const labels: Record<EmergencyAction, string> = {
    freeze: 'gelés',
    suspend: 'suspendu',
    force_reversal: 'annulée de force'
  }

  confirmation.value = `Compte ${form.accountId} : actifs ${labels[form.action]}.`
  v$.value.$reset()
  form.accountId = ''
  form.reason = ''
}
</script>

<template>
  <main class="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-xl">
    <div class="max-w-2xl mx-auto">
      <RouterLink to="/admin" class="font-label-sm text-label-sm text-primary hover:underline">
        &larr; Retour au dashboard
      </RouterLink>

      <h1 class="font-headline-lg text-headline-lg text-on-surface mt-md mb-lg">
        Actions d'urgence
      </h1>

      <p v-if="confirmation" class="mb-lg p-md rounded-lg bg-success/10 text-success font-body-md text-body-md">
        {{ confirmation }}
      </p>

      <form novalidate class="bg-surface rounded-xl shadow-level-1 border border-outline-variant/30 p-lg space-y-lg" @submit.prevent="onSubmit">
        <div class="space-y-xs">
          <label class="font-label-sm text-label-sm text-on-surface-variant block" for="accountId">
            Identifiant du compte
          </label>
          <input
            id="accountId"
            v-model="v$.accountId.$model"
            type="text"
            placeholder="C1231006815"
            class="w-full h-12 px-md rounded-lg border font-body-md text-on-surface input-focus-glow transition-all"
            :class="v$.accountId.$error ? 'border-danger' : 'border-outline-variant'"
            @blur="v$.accountId.$touch()"
          />
          <p v-if="v$.accountId.$error" class="text-danger text-label-sm font-body-md">
            {{ v$.accountId.$errors[0].$message }}
          </p>
        </div>

        <div class="space-y-sm">
          <label class="font-label-sm text-label-sm text-on-surface-variant block">Action</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-sm">
            <label
              v-for="option in [
                { value: 'freeze', label: 'Geler les actifs' },
                { value: 'suspend', label: 'Suspendre le compte' },
                { value: 'force_reversal', label: 'Annuler la transaction' }
              ]"
              :key="option.value"
              class="flex items-center gap-sm p-md border rounded-lg cursor-pointer transition-all"
              :class="form.action === option.value ? 'border-danger bg-danger/5' : 'border-outline-variant'"
            >
              <input v-model="form.action" type="radio" :value="option.value" class="hidden" />
              <span class="font-label-sm text-label-sm">{{ option.label }}</span>
            </label>
          </div>
        </div>

        <div class="space-y-xs">
          <label class="font-label-sm text-label-sm text-on-surface-variant block" for="reason">
            Motif (journal d'audit)
          </label>
          <textarea
            id="reason"
            v-model="v$.reason.$model"
            rows="3"
            placeholder="Décrivez la raison de cette action d'urgence..."
            class="w-full px-md py-sm rounded-lg border font-body-md text-on-surface input-focus-glow transition-all"
            :class="v$.reason.$error ? 'border-danger' : 'border-outline-variant'"
            @blur="v$.reason.$touch()"
          />
          <p v-if="v$.reason.$error" class="text-danger text-label-sm font-body-md">
            {{ v$.reason.$errors[0].$message }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full h-12 bg-danger text-white font-title-md rounded-lg shadow-md hover:opacity-90 transition-all"
        >
          Exécuter l'action d'urgence
        </button>
      </form>
    </div>
  </main>
</template>
