# SecureTrans — Base Vue 3 + TypeScript

Socle applicatif généré à partir du design system **SecureTrans** (Stitch), pour la plateforme
financière avec détection de fraude par IA (Backend Spring Boot / PostgreSQL prévu séparément).

## Stack

- **Vue 3** (`<script setup>`) + **TypeScript**
- **Vite** — bundler / dev server
- **Vue Router 4** — routage avec guards d'authentification et de rôle
- **Pinia** — store d'authentification (`useAuthStore`)
- **@vuelidate/core** + **@vuelidate/validators** — validation de formulaires
- **Tailwind CSS** — configuré avec les tokens exacts du design system (`tailwind.config.ts`)

## Démarrage

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
```

## Structure

```
src/
  assets/main.css          # Tailwind + classes utilitaires (glass-effect, input-focus-glow...)
  components/modals/       # DepositModal.vue, WithdrawModal.vue (Vuelidate intégré)
  router/index.ts          # Routes + guards (requiresAuth, requiresAdmin, guestOnly)
  stores/auth.ts           # Store Pinia d'authentification (à brancher sur l'API réelle)
  types/index.ts           # Types partagés (Transaction, AuthUser, payloads de formulaires...)
  validations/rules.ts     # Règles Vuelidate personnalisées (IBAN, montant, mot de passe fort...)
  views/                   # Une vue par écran du design system
```

## Routes

| Path                        | Vue                       | Protection                  |
|-----------------------------|----------------------------|------------------------------|
| `/`                         | HomeView                   | publique (accueil)          |
| `/connexion`                | LoginView                  | invités uniquement          |
| `/tableau-de-bord`          | UserDashboardView          | authentifié                 |
| `/transactions`             | TransactionHistoryView     | authentifié                 |
| `/analyse-ia/:transactionId`| AIAnalysisView              | authentifié                 |
| `/admin`                    | AdminDashboardView         | authentifié + admin         |
| `/admin/urgence`            | AdminEmergencyView         | authentifié + admin         |

> Démo : se connecter avec un email commençant par `admin@` donne le rôle administrateur.

## Validation Vuelidate — règles incluses

- **Connexion** : email valide, mot de passe requis (8 caractères min).
- **Dépôt** : montant positif (2 décimales max), borné entre 10 € et 50 000 €.
- **Retrait** : IBAN au format valide, montant positif borné entre 20 € et le solde disponible.
- **Action d'urgence admin** : identifiant de compte et motif d'audit obligatoires.

Les règles génériques et messages d'erreur en français sont centralisés dans
`src/validations/rules.ts` pour être réutilisés dans tout nouveau formulaire.

## Prochaines étapes suggérées

1. Remplacer `useAuthStore.login()` par un vrai appel HTTP vers l'API Spring Boot (JWT).
2. Créer un client HTTP (`src/services/api.ts`) avec intercepteur pour le token.
3. Brancher `TransactionHistoryView` et `AdminDashboardView` sur les endpoints réels.
4. Ajouter des tests unitaires (Vitest) sur les règles de validation et les stores.
