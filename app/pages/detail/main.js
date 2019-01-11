


import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import routes from './router'

Vue.config.productionTip = false

Vue.use(VueRouter)


var router = new VueRouter({
  	routes,
 	// mode: 'history'
})


new Vue({
	router,
  	components: { App },
  	template: '<App/>'
}).$mount('#app')
