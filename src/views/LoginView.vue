<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email as emailRule, minLength, helpers } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'
import { validationMessages } from '@/validations/rules'
import type { LoginPayload } from '@/types'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = reactive<LoginPayload>({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const isSubmitting = ref(false)
const loginError = ref('')

const rules = {
  email: {
    required: helpers.withMessage(validationMessages.required, required),
    email: helpers.withMessage(validationMessages.email, emailRule)
  },
  password: {
    required: helpers.withMessage(validationMessages.required, required),
    minLength: helpers.withMessage(validationMessages.minLength(8), minLength(8))
  }
}

const v$ = useVuelidate(rules, form)

async function onSubmit() {
  loginError.value = ''
  const isValid = await v$.value.$validate()
  if (!isValid) return

  isSubmitting.value = true
  try {
    await auth.login(form)
    const redirect = (route.query.redirect as string) || '/tableau-de-bord'
    router.push(redirect)
  } catch (error) {
    loginError.value = 'Identifiants invalides. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="flex min-h-screen w-full">
    <section
      class="hidden lg:flex lg:w-1/2 relative bg-primary-container items-center justify-center p-xl overflow-hidden"
    >
      <div class="relative z-10 max-w-md text-center">
        <div class="mb-lg inline-flex items-center justify-center w-20 h-20 rounded-xl glass-effect shadow-xl">
          <span class="material-symbols-outlined text-4xl text-primary">shield_with_heart</span>
        </div>
        <h1 class="font-display-lg text-display-lg text-white mb-md tracking-tight">
          Confiance institutionnelle, vélocité moderne.
        </h1>
        <p class="font-body-lg text-body-lg text-justify text-on-primary-container opacity-90 leading-relaxed">
          SecureTrans propulse les opérations financières les plus exigeantes avec une sécurité
          de niveau entreprise et des outils analytiques précis.
        </p>
        <!-- <div class="mt-xl p-md glass-effect rounded-xl text-left flex items-center space-x-md">
          <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
            <span class="material-symbols-outlined text-white">verified_user</span>
          </div>
          <div>
            <p class="font-label-sm text-label-sm text-primary uppercase">Statut de sécurité</p>
            <p class="font-title-md text-title-md text-on-surface">Conforme SOC2 Type II</p>
          </div>
        </div> -->
      </div>
    </section>

    <section class="w-full lg:w-1/2 flex items-center justify-center bg-surface p-margin-mobile md:p-margin-desktop">
      <div class="w-full max-w-md">
        <div class="mb-xl text-center lg:text-left">
          <div class="flex items-center justify-center lg:justify-start gap-sm mb-sm">
            <span class="material-symbols-outlined text-primary text-3xl font-bold">account_balance_wallet</span>
            <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">SecureTrans</span>
          </div>
          <h2 class="font-headline-lg text-headline-lg text-on-surface">Bon retour</h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Veuillez saisir vos identifiants pour accéder à votre portail.
          </p>
        </div>

        <form class="space-y-lg" novalidate @submit.prevent="onSubmit">
          <div class="space-y-xs">
            <label class="font-label-sm text-label-sm text-on-surface-variant block" for="email">
              Adresse email
            </label>
            <input
              id="email"
              v-model="v$.email.$model"
              type="email"
              placeholder="admin@securetrans.com"
              class="w-full h-12 px-md rounded-lg border bg-surface-bright font-body-md text-on-surface input-focus-glow transition-all"
              :class="v$.email.$error ? 'border-danger' : 'border-outline-variant'"
              @blur="v$.email.$touch()"
            />
            <p v-if="v$.email.$error" class="text-danger text-label-sm font-body-md">
              {{ v$.email.$errors[0].$message }}
            </p>
          </div>

          <div class="space-y-xs">
            <div class="flex justify-between items-center">
              <label class="font-label-sm text-label-sm text-on-surface-variant block" for="password">
                Mot de passe
              </label>
              <a class="font-label-sm text-label-sm text-primary hover:underline transition-all" href="#">
                Mot de passe oublié ?
              </a>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="v$.password.$model"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full h-12 px-md rounded-lg border bg-surface-bright font-body-md text-on-surface input-focus-glow transition-all"
                :class="v$.password.$error ? 'border-danger' : 'border-outline-variant'"
                @blur="v$.password.$touch()"
              />
              <button
                type="button"
                class="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant"
                @click="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined text-md">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
            <p v-if="v$.password.$error" class="text-danger text-label-sm font-body-md">
              {{ v$.password.$errors[0].$message }}
            </p>
          </div>

          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary"
            />
            <label class="ml-sm font-body-md text-body-md text-on-surface-variant" for="remember">
              Se souvenir de moi pendant 30 jours
            </label>
          </div>

          <p v-if="loginError" class="text-danger text-body-md font-body-md">{{ loginError }}</p>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full h-12 bg-primary hover:bg-primary-container text-white font-title-md rounded-lg shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-sm disabled:opacity-60"
          >
            {{ isSubmitting ? 'Connexion en cours...' : 'Se connecter' }}
            <span class="material-symbols-outlined text-sm">login</span>
          </button>
        </form>

        <!-- <p class="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
          Astuce démo : utilisez un email commençant par
          <span class="font-bold text-primary">admin@</span> pour accéder au dashboard administrateur.
        </p> -->
      </div>
    </section>
  </main>
</template>
