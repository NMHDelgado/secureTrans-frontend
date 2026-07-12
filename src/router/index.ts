import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('@/views/HomeView.vue'),
  //   meta: { title: 'Accueil' }
  // },
  {
    path: '/connexion',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Connexion', guestOnly: true }
  },

  {
    path: '/',
    name: 'home',
    component: () => import('@/views/UserDashboardView.vue'),
    meta: { title: 'Accueil'}
  },

  // {
  //   path: '/tableau-de-bord',
  //   name: 'user-dashboard',
  //   component: () => import('@/views/UserDashboardView.vue'),
  //   meta: { title: 'Tableau de bord', requiresAuth: true }
  // },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/TransactionHistoryView.vue'),
    meta: { title: 'Historique des transactions', requiresAuth: true }
  },
  {
    path: '/analyse-ia/:transactionId',
    name: 'ai-analysis',
    component: () => import('@/views/AIAnalysisView.vue'),
    meta: { title: "Analyse IA détaillée", requiresAuth: true },
    props: true
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: () => import('@/views/AdminDashboardView.vue'),
    meta: { title: 'Dashboard administrateur', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/urgence',
    name: 'admin-emergency',
    component: () => import('@/views/AdminEmergencyView.vue'),
    meta: {
      title: "Actions d'urgence",
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page introuvable' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  document.title = to.meta.title ? `SecureTrans | ${to.meta.title}` : 'SecureTrans'

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: 'user-dashboard' }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'user-dashboard' }
  }

  return true
})

export default router
