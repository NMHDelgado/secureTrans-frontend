import { helpers } from '@vuelidate/validators'

/**
 * Règles de validation personnalisées pour SecureTrans.
 * Regroupées ici pour être partagées entre les formulaires (login, dépôt, retrait, etc.)
 */

// Mot de passe : au moins 8 caractères, 1 majuscule, 1 chiffre
export const strongPassword = helpers.regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/)

// IBAN simplifié (2 lettres pays + 2 chiffres clé + jusqu'à 30 alphanum)
export const ibanFormat = helpers.regex(/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/)

// Montant positif avec au maximum 2 décimales
export const positiveAmount = helpers.regex(/^\d+(\.\d{1,2})?$/)

export const validationMessages = {
  required: 'Ce champ est obligatoire.',
  email: 'Veuillez saisir une adresse email valide.',
  minLength: (n: number) => `Ce champ doit contenir au moins ${n} caractères.`,
  strongPassword:
    'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.',
  sameAsPassword: 'Les mots de passe ne correspondent pas.',
  minValue: (n: number) => `Le montant minimum est de ${n} €.`,
  maxValue: (n: number) => `Le montant maximum est de ${n} €.`,
  ibanFormat: 'Le format IBAN saisi est invalide.',
  positiveAmount: 'Veuillez saisir un montant valide (max. 2 décimales).',
  checked: 'Vous devez accepter les conditions pour continuer.'
}
