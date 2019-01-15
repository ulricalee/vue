// import login from '../components/login'
// import life from '../components/life'
const life = () => import('../components/life')
const login = () => import('../components/login')
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
  	}
]


export default routes