export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    settings: '/dashboard/settings',
    bills: '/dashboard/bills',
    calculateBill: '/dashboard/billCalculation',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
