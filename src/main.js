import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import StoreData from './store'
import {initialize} from './helpers'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false
const store = new Vuex.Store(StoreData);
initialize(store, router);

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
