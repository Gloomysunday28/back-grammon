import Vue from 'vue'
import rem from './utils/rem'
import App from './App.vue'

Vue.use(rem)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
