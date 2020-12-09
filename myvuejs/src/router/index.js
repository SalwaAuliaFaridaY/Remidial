import Welcome from '@/components/Welcome'
import Signin from '@/components/auth/Signin'
import Signup from '@/components/auth/Signup'
import Signout from '@/components/auth/Signout'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    props: true,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/signout',
    name: 'Sigout',
    component: Signout,
  },
]

export default routes
