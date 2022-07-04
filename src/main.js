import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import App from './App.vue'
import router from './router';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store';
import { firebaseConfig } from './config'
import firebase from 'firebase/app';
import 'firebase/auth';
import VueApexCharts from 'vue-apexcharts';
import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use( CKEditor );
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
firebase.initializeApp(firebaseConfig)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter);
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import loading from '@/components/loading'
Vue.component('loading', loading)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
})