import Vue from 'vue'
import App from './App.vue'
import {firestorePlugin} from 'vuefire'  
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

 
//import VueFire from 'vuefire'
import router from './router/index'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAj9vaY2ZUV7oFwla_yoZuPthBsETsX1ts",
    authDomain: "fabrica-memes-1a36b.firebaseapp.com",
    projectId: "fabrica-memes-1a36b",
    storageBucket: "fabrica-memes-1a36b.appspot.com",
    messagingSenderId: "919514058223",
    appId: "1:919514058223:web:8cf79025b437a82af4ba1a",
    measurementId: "G-TTFGR2CKN7"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  export const firestore = firebaseApp.firestore()
  export const storage = firebase.storage().ref('/images')
  
  Vue.use(firestorePlugin)
  
  
  new Vue({
    vuetify,
    render: h => h(App),
    router,
    components: {App} 
  }).$mount('#app')