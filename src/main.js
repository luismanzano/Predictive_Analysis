import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
import VueFire from 'vuefire'
import router from './router/index'

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
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const firestore = firebaseApp.firestore();
  export const storage = firebase.storage().ref('/images');

  Vue.use(VueFire);

new Vue({
  vuetify,
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
