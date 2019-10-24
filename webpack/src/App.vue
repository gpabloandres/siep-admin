<template>
  <v-app>
      <!-- MENU DE NAVEGACION !-->
      <v-navigation-drawer
        persistent
        v-model="drawer"
        enable-resize-watcher
        fixed
        app
      >
        <!-- Componente UserSidebar -->
        <user-sidebar />
        <v-divider></v-divider>
        <!-- Componente MenuSidebar -->
        <menu-sidebar />
      </v-navigation-drawer>
      <!-- FIN MENU DE NAVEGACION !-->
      <!-- Menu toolbar !-->
      <v-toolbar app :color="menu_toolbar.header_color" dark >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-text="menu_toolbar.title" ></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-on:click="logout()" color="blue-grey darken-2" v-if="logged" dark >
          <v-icon>power_settings_new</v-icon>
          Cerrar Sesion
        </v-btn>
      </v-toolbar>

      <!-- CONTENIDO DE NAVEGACION !-->
      <v-content>
        <router-view/>
      </v-content>
      <!-- FIN CONTENIDO DE NAVEGACION !-->
    <v-footer
      height="auto"
      color="primary lighten-1"
    >
      <v-flex
        text-xs-center
        white--text
        xs12
      >
        &copy; 2019 — <strong>Subsecretaría de Planeamiento Educativo, Informática y Evaluación</strong>
      </v-flex>
    </v-footer>
  </v-app>
  
</template>

<script>
  import MenuSidebar from './components/menu_sidebar'
  import UserSidebar from './components/user_sidebar'

  export default {
    components :{ MenuSidebar, UserSidebar },
    data () {
      return {
        drawer: false,
        toolbar_disabled:true,
        maintenanceMode: false
      }
    },
    computed: {
      menu_toolbar() {
        return store.state.menu_toolbar;
      },
      user() {
        return store.state.login_api.user
      },
      logged() {
        return store.state.login_api.loggedIn;
      }
    },
    created(){
      console.log('APP Created');
      store.dispatch('LOGIN_API_fetchUserRemember');
      // ESTO ES PARA MÁS ADELANTE
      // store.dispatch('getAdministracionData');
    },
    methods: {
      logout() {
        store.dispatch('LOGIN_API_logout');
      }
    },
    name: 'App'
  }
</script>
