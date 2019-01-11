import '@/static/css/base.css'
import '@/static/scss/a.scss'
import './assets/css/a.css'


import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueRouter)

var router = new VueRouter({
  	routes,
 	// mode: 'history'
})


new Vue({
	router,
	store,
  	components: { App },
  	template: '<App/>'
}).$mount('#app')
