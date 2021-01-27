import Vue from 'vue'
import Home from './Home.vue'
import VueRouter from 'vue-router';
import Axios from 'axios'
import VueAxios from'vue-axios'
import routes from './router'
import { BootstrapVue } from 'bootstrap-vue'
import VueToastr from "vue-toastr";
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
Axios.defaults.baseURL="https://localhost:44346/api/Service";
Axios.defaults.timeout="20000";
Axios.defaults.timeoutErrorMessage="Yêu cầu không có phản hồi";
Axios.defaults.headers.common = { "Accept": "application/json" };
Axios.defaults.headers.post = { "Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials":true,"Content-Type":"application/json" };
// register component
Vue.component("vue-toastr", VueToastr);
window.toastr = require('toastr')
Axios.defaults.withCredentials=false;
Vue.use(VueToastr);
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
  mounted(){
    this.$toastr.defaultPosition = "toast-top-right";
    // Send message to browser screen
  }
}).$mount('#app')
 