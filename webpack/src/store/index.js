import Vue from 'vue'
import Vuex from 'vuex'

import menu from './model/menu'
import menu_toolbar from './model/menu_toolbar'

//import user from './model/user'
import login_api from './model/login_api'
import alert from './model/alert'
import dialog from './model/dialog'
import administracion from './model/administracion'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    menu: menu,
    menu_toolbar: menu_toolbar,

//    user: user,
    login_api: login_api,
    alert:alert,
    dialog:dialog,
    administracion:administracion
  }
});

export default store
window.store = store
