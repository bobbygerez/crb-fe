const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/dashboard/index.vue'),
      meta: {
        title: 'Home',
        needAuth: true
      }
    }]
  },
  {
    path: '/dashboard/submenu/:id/holdings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/dashboard/submenu/holdings/index.vue')
    }],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/submenu/:submenu/companies',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/dashboard/submenu/companies/index.vue')
    }],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/submenu/:submenu/roles',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/dashboard/submenu/roles/index.vue')
    }],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/submenu/:submenu/menus',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/dashboard/submenu/menus/index.vue')
    }],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/submenu/:submenu/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/dashboard/submenu/users/index.vue')
    }],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/dashboard/submenu/:id/holdings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/dashboard/submenu/holdings/index.vue')
    }],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/submenu/:submenu/holdings/:holding/branches',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/dashboard/submenu/holdings/index.vue')
    }],
    meta: {
      requiresAuth: true
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
