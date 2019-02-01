import '@/static/css/base.css'
import './assets/css/a.css'


import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import Navigation from 'vue-navigation'
 
import Cell from 'vant/lib/cell'
import CellGroup from 'vant/lib/cell-group'
import Field from 'vant/lib/field'
import Button from 'vant/lib/button'
import Notify from 'vant/lib/notify'
import Toast from 'vant/lib/toast'

import 'vant/lib/index.css'

Vue.use(Cell)
   .use(CellGroup)
   .use(Field)
   .use(Button)
   .use(Notify)
   .use(Toast)


Vue.config.productionTip = false


var router = new VueRouter({
  	routes,
 	// mode: 'history'
})

Vue.use(Navigation, {router, keyName: 'VUE'})
Vue.use(VueRouter)

new Vue({
	router,
	store,
  	components: { App },
  	template: '<App/>'
}).$mount('#app')
