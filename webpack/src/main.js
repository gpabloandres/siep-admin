// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faGoogle, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faFileExcel, faFacebookF, faGoogle, faLinkedinIn, faTwitter, faFilePdf)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Google Maps
import * as VueGoogleMaps from "vue2-google-maps";

// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import _ from 'lodash';

// Source
import router from './router'
import store from './store'

// ScrollTo
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo, {
     container: "body",
     duration: 500,
     easing: "ease",
     offset: 0,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })

Vue.use(Vuetify);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBFPUFES_l4Gn4QKty9nwXTdeM-Ew-Hxb8",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
