

const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]

  },
  {
    path: '/login',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard/index.vue') },
      { path: '/'}
    ], 
    meta: { requiresAuth: true}
  },
  {
    path: '/dashboard/submenu/:id/holdings',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard/submenu/holdings/index.vue') }
    ], 
    meta: { requiresAuth: true}
  },
  {
    path: '/dashboard/submenu/:submenu/holdings/:holding/branches',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard/submenu/holdings/index.vue') }
    ], 
    meta: { requiresAuth: true}
  },
  {
    path: '/category/:name/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/category/index.vue') }
    ]
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