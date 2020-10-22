/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

//Fazendo importações necessária de pacotes
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource';
import axios from "axios"

//Permitindo o uso do axios
Vue.prototype.$axios = axios

window.axios = require('axios');
Vue.config.productionTip = false

Vue.use(VueResource)

Vue.prototype.$axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
