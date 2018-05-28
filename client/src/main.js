// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueProgressBar from 'vue-progressbar'
import Toasted from 'vue-toasted';
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';

import { Navbar } from 'bootstrap-vue/es/components';



import helpers from './helpers'
import constants from './constants';
import RequiredTag from './components/stuff/RequiredTag.vue'
import App from './App'
import router from './router'

Vue.use(BootstrapVue);
Vue.use(VueProgressBar, { color: '#00ff59', thickness: '3px' })
Vue.use(Toasted, { 
  position: 'top-right', 
  theme: 'bubble', 
  fitToScreen: true, 
  iconPack : 'fontawesome', 
  className: 'toast'
})
Vue.use(helpers)
Vue.use(constants)
Vue.use(Navbar);
Vue.use(VeeValidate);

Vue.component('required-tag', RequiredTag)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
