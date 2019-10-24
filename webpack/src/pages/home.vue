<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/membretes-sup-edu2.jpg" alt="SIEP" >
        <!--<blockquote>
          "Sistema de Información Educativa Provincial."
          <footer>
            <small>
              <em>&mdash;Tierra del Fuego</em>
            </small>
          </footer>
        </blockquote>-->
        <login_api></login_api>

      </v-layout>
    </v-slide-y-transition>
  </v-container>

</template>


<script>
  import router from '../router'
  import login_api from '../components/login_api'

  export default {
    created: function(){
      store.commit('updateTitle',"SIEP | Servicio");
    },
    components:{
      login_api
    },
    computed:{
      user(){
        return store.state.user
      },
      persona(){
        return store.getters.persona;
      },
      // ESTO ES PARA MAS ADELANTE
      // administracion(){
      //   if(store.state.administracion.administracion.en_mantenimiento === 1){
      //     router.push('/mantenimiento');
      //   }
      //   return store.state.administracion.administracion;
      // }
    },
    watch: {
      // ESTO ES PARA MAS ADELANTE
      // administracion(){}
    }
  }
</script>
