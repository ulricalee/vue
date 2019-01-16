// import login from '../components/login'
// import life from '../components/life'
const life = () => import('../components/life')
const login = () => import('../components/login')
const register = () => import('../components/register')
const routes = [
  	{
  		path: '/login',
  		name: 'login',
  		component: login
  	},
  	{
  		path:'/life',
  		name: 'life',
  		component: life
  	},
    {
      path:'/register',
      name: 'register',
      component: register
    }
]


export default routes