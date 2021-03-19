function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'welcome', component: page('welcome.vue') },

  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },
  { path: '/password/reset', name: 'password.request', component: page('auth/password/email.vue') },
  { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/reset.vue') },
  { path: '/email/verify/:id', name: 'verification.verify', component: page('auth/verification/verify.vue') },
  { path: '/email/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },

  { path: '/home', name: 'home', component: page('home.vue') },
  {
    path: '/settings',
    component: page('settings/index.vue'),
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: page('settings/profile.vue') },
      { path: 'password', name: 'settings.password', component: page('settings/password.vue') }
    ]
  },
  { path: '/request-items', name: 'request-item.index', component: page('request-item/index.vue') },
  { path: '/request-items/create', name: 'request-item.create', component: page('request-item/create.vue') },
  {
    path: '/master',
    component: page('master/index.vue'),
    children: [
      { path: '', redirect: { name: 'master.items' } },
      { path: 'items', name: 'master.items', component: page('master/item.vue') },
      { path: 'employees', name: 'master.employees', component: page('master/employee.vue') },
      { path: 'departments', name: 'master.departments', component: page('master/department.vue') },
      { path: 'locations', name: 'master.locations', component: page('master/location.vue') },
      { path: 'units', name: 'master.units', component: page('master/unit.vue') }
    ]
  },
  { path: '*', component: page('errors/404.vue') }
]
