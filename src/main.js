// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Ingredients from './components/Ingredients.vue'
import App from './App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Typeahead from 'typeahead.js'

window.$ = window.jQuery = require('jquery')

Vue.use(VueResource)

Vue.use(VueRouter)

const Hello = { template: '<div>home</div>' }

const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '/', component: Hello },
    { path: '/ingredients', component: Ingredients }
  ]
})

new Vue({
  router,
  ...App,
  ...Typeahead
}).$mount('#app')
