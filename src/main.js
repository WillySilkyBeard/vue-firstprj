import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import BuyModalComponent from '@/components/Shared/BuyModal'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
// vue-resource глобальная настройка
Vue.use(VueResource)
//Vue.http.options.root = 'http://localhost:8080/';
Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;
Vue.component('app-buy-modal', BuyModalComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {  // настройки БД firebase
    fb.initializeApp({
      apiKey: 'AIzaSyBkC_uACjpQnJHToB7BmANgw8ARpNPMWfE',
      authDomain: 'testproject-191701.firebaseapp.com',
      databaseURL: 'https://testproject-191701.firebaseio.com',
      projectId: 'testproject-191701',
      storageBucket: 'testproject-191701.appspot.com',
      messagingSenderId: '951731845528'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
