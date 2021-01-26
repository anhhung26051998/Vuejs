import Vue from 'vue'
import Home from './Home.vue'
import VueRouter from 'vue-router';
import Axios from 'axios'
import VueAxios from'vue-axios'
import routes from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
Axios.defaults.baseURL="https://localhost:44346/api/Service";
Axios.defaults.timeout="2000";
Axios.defaults.timeoutErrorMessage="Yêu cầu không có phản hồi";
Axios.defaults.headers["Access-Control-Allow-Origin"]="*";
Axios.defaults.headers = { "Content-Type": "application/json" };
Axios.defaults.headers = { "Accept": "application/json" };
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueAxios,Axios)
const router=new VueRouter({
  routes,
  mode:"history"
})
new Vue({
  router,
  render: h => h(Home),
}).$mount('#app')
