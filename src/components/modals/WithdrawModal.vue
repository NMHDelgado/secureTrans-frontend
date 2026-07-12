<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minValue, maxValue, helpers } from '@vuelidate/validators'
import { ibanFormat, positiveAmount, validationMessages } from '@/validations/rules'
import type { WithdrawPayload } from '@/types'

const props = defineProps<{
  availableBalance: number
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: WithdrawPayload]
}>()

const MIN_WITHDRAWAL = 20

const form = reactive<WithdrawPayload>({
  destinationAccount: '',
  amount: 0
})

const rules = {
  destinationAccount: {
    required: helpers.withMessage(validationMessages.required, required),
    ibanFormat: helpers.withMessage(validationMessages.ibanFormat, ibanFormat)
  },
  amount: {
    required: helpers.withMessage(validationMessages.required, required),
    positiveAmount: helpers.withMessage(validationMessages.positiveAmount, positiveAmount),
    minValue: helpers.withMessage(
      validationMessages.minValue(MIN_WITHDRAWAL),
      minValue(MIN_WITHDRAWAL)
    ),
    maxValue: helpers.withMessage(
      validationMessages.maxValue(props.availableBalance),
      maxValue(props.availableBalance)
    )
  }
}

const v$ = useVuelidate(rules, form)

async function onSubmit() {
  const isValid = await v$.value.$validate()
  if (!isValid) return
  emit('submit', { ...form })
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 p-md">
    <div class="w-full max-w-md bg-surface rounded-xl shadow-2xl p-lg">
      <div class="flex items-center justify-between mb-lg">
        <div class="flex items-center gap-sm">
          <span class="material-symbols-outlined text-primary">north_east</span>
          <h2 class="font-title-md text-title-md text-on-surface">Effectuer un retrait</h2>
        </div>
        <button type="button" class="text-on-surface-variant hover:text-on-surface" @click="emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <p class="font-body-md text-body-md text-on-surface-variant mb-lg">
        Solde disponible :
        <span class="font-bold text-on-surface tabular-nums">
          {{ availableBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
        </span>
      </p>

      <form novalidate class="space-y-lg" @submit.prevent="onSubmit">
        <div class="space-y-xs">
          <label class="font-title-md text-title-md text-on-surface" for="destination">
            IBAN de destination
          </label>
          <input
            id="destination"
            v-model="v$.destinationAccount.$model"
            type="text"
            placeholder="FR7630006000011234567890189"
            class="w-full h-12 px-md rounded-lg border font-body-md text-on-surface uppercase input-focus-glow transition-all"
            :class="v$.destinationAccount.$error ? 'border-danger' : 'border-outline-variant'"
            @blur="v$.destinationAccount.$touch()"
          />
          <p v-if="v$.destinationAccount.$error" class="text-danger text-label-sm font-body-md">
            {{ v$.destinationAccount.$errors[0].$message }}
          </p>
        </div>

        <div class="space-y-xs">
          <label class="font-title-md text-title-md text-on-surface" for="withdraw-amount">
            Montant à retirer
          </label>
          <input
            id="withdraw-amount"
            v-model.number="v$.amount.$model"
            type="number"
            step="0.01"
            placeholder="0.00"
            class="w-full h-16 px-md rounded-xl border focus:ring-4 focus:ring-primary/10 text-headline-md font-bold text-on-surface transition-all"
            :class="v$.amount.$error ? 'border-danger' : 'border-outline-variant focus:border-primary'"
            @blur="v$.amount.$touch()"
          />
          <p v-if="v$.amount.$error" class="text-danger text-label-sm font-body-md">
            {{ v$.amount.$errors[0].$message }}
          </p>
        </div>

        <div class="flex gap-md">
          <button
            type="button"
            class="flex-1 h-12 border border-outline-variant rounded-lg font-title-md text-on-surface hover:bg-surface-container-low transition-all"
            @click="emit('close')"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="flex-1 h-12 bg-danger text-white rounded-lg font-title-md shadow-md hover:opacity-90 transition-all"
          >
            Confirmer le retrait
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
