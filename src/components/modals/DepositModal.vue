<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minValue, maxValue, helpers } from '@vuelidate/validators'
import { positiveAmount, validationMessages } from '@/validations/rules'
import type { DepositPayload } from '@/types'

const emit = defineEmits<{
  close: []
  submit: [payload: DepositPayload]
}>()

const MIN_DEPOSIT = 10
const MAX_DEPOSIT = 50000

const form = reactive<DepositPayload>({
  paymentMethod: 'card',
  currency: 'EUR',
  amount: 0
})

const rules = {
  amount: {
    required: helpers.withMessage(validationMessages.required, required),
    positiveAmount: helpers.withMessage(validationMessages.positiveAmount, positiveAmount),
    minValue: helpers.withMessage(validationMessages.minValue(MIN_DEPOSIT), minValue(MIN_DEPOSIT)),
    maxValue: helpers.withMessage(validationMessages.maxValue(MAX_DEPOSIT), maxValue(MAX_DEPOSIT))
  }
}

const v$ = useVuelidate(rules, form)

function addQuickAmount(value: number) {
  form.amount = Number(form.amount || 0) + value
  v$.value.amount.$touch()
}

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
          <span class="material-symbols-outlined text-primary">account_balance_wallet</span>
          <h2 class="font-title-md text-title-md text-on-surface">Effectuer un dépôt</h2>
        </div>
        <button type="button" class="text-on-surface-variant hover:text-on-surface" @click="emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <form novalidate class="space-y-lg" @submit.prevent="onSubmit">
        <div class="space-y-sm">
          <label class="font-title-md text-title-md text-on-surface">Méthode de paiement</label>
          <div class="grid grid-cols-2 gap-md">
            <label
              class="flex items-center gap-md p-md border rounded-xl cursor-pointer transition-all"
              :class="form.paymentMethod === 'card' ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant'"
            >
              <input v-model="form.paymentMethod" type="radio" value="card" class="hidden" />
              <span class="material-symbols-outlined text-primary">credit_card</span>
              <span class="font-label-sm text-label-sm font-bold">Mobile Money</span>
            </label>
            <label
              class="flex items-center gap-md p-md border rounded-xl cursor-pointer transition-all"
              :class="form.paymentMethod === 'transfer' ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant'"
            >
              <input v-model="form.paymentMethod" type="radio" value="transfer" class="hidden" />
              <span class="material-symbols-outlined text-primary">account_balance</span>
              <span class="font-label-sm text-label-sm font-bold">Carte bancaire</span>
            </label>
          </div>
        </div>

        <div class="space-y-xs">
          <label class="font-title-md text-title-md text-on-surface" for="amount">Montant à déposer</label>
          <input
            id="amount"
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
          <div class="flex gap-sm pt-xs">
            <button
              v-for="quick in [100, 500, 1000, 5000]"
              :key="quick"
              type="button"
              class="px-md py-sm bg-surface-container-high rounded-full font-label-sm text-label-sm hover:bg-primary/10 hover:text-primary transition-colors"
              @click="addQuickAmount(quick)"
            >
              +{{ quick.toLocaleString('fr-FR') }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-sm text-on-surface-variant text-label-sm font-label-sm">
          <span class="material-symbols-outlined text-sm">lock</span>
          <span>PCI-DSS Secure</span>
          <span class="material-symbols-outlined text-sm ml-md">verified_user</span>
          <span>SSL 256-bit</span>
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
            class="flex-1 h-12 bg-primary text-white rounded-lg font-title-md shadow-md hover:bg-primary-container transition-all"
          >
            Confirmer le dépôt
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
