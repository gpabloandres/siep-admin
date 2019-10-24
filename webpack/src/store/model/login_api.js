// Modelo User
import axios from 'axios'
import router from '../../router'

const module = {
  state: {
    // Flags
    loginIsRunning: false,
    loggedIn: false,
    token: '',

    fetchUserIsRunning: false,
    user:{}
  },
  getters: {
  },
  mutations: {
    LOGIN_API_checkLocalStorage: function(state){
      state.token = localStorage.getItem('LOGIN_API_TOKEN');
    },
    LOGIN_API_updateToken: function(state, token){
      state.token = token;
      localStorage.setItem('LOGIN_API_TOKEN',token);
    },
    LOGIN_API_running: function(state, running){
      state.loginIsRunning = running;
    },
    LOGIN_API_updateUser: function(state, userData){
      state.user= userData;
      state.loggedIn= true;
    },
    LOGIN_API_fetchUserIsrunning: function(state, running){
      state.fetchUserIsRunning = running;
    },
    LOGIN_API_clear: function(state){
      state.loggedIn = false;
      state.user = {};
      state.token = '';
      localStorage.removeItem('LOGIN_API_TOKEN');
    }
  },
  actions: {
    LOGIN_API_fetchUserRemember: function ({commit, dispatch, state}) {
      if (!this.fetchUserIsRunning) {
        commit('LOGIN_API_fetchUserIsrunning',true);

        // Verifica si el existe un token de logueo en localStorage
        commit('LOGIN_API_checkLocalStorage');

        // Si no existe token... detiene el consumo del api
        if(state.token==null) {
         return;
        }

        const curl = axios.create({
          baseURL: process.env.SIEP_API_GW_INGRESS
        });

        // Header con token
        curl.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

        curl.get('/auth/me')
            .then(function (response) {
              // handle success
              console.log('LOGIN_API_fetchUser SUCCESS',response.data);

              commit('LOGIN_API_updateUser',response.data);
              commit('LOGIN_API_fetchUserIsrunning',false);
            })
            .catch(function (error) {
              // handle error
              console.log('LOGIN_API_fetchUser ERROR', error);

              commit('LOGIN_API_clear');
              commit('LOGIN_API_fetchUserIsrunning',false);
            });
      }
    },
    // Consume API con TOKEN
    LOGIN_API_login: function ({commit, dispatch, state}, payload) {
      if (!this.loginIsRunning) {
        commit('LOGIN_API_running', true);

        // Clear all
        commit('LOGIN_API_clear');
        const curl = axios.create({
          baseURL: process.env.SIEP_API_GW_INGRESS
        });

        curl.post('/auth/login', payload)
        .then(function (response) {
          // handle success
          commit('LOGIN_API_updateToken', response.data.token);
          commit('LOGIN_API_running', false);

          dispatch('LOGIN_API_fetchUser');
        })
        .catch(function (error) {
          // handle error
          alert(error.response.data.message);

          commit('LOGIN_API_clear');
          commit('LOGIN_API_running', false);
        });
      }

    },
    LOGIN_API_logout:function({commit}){
      commit('LOGIN_API_clear');
      commit('LOGIN_API_running', false);
      router.push('/home');
    },
    // Obtiene informacion de usuario con con el TOKEN
    LOGIN_API_fetchUser: function ({commit, dispatch, state}) {
      if (!this.fetchUserIsRunning) {
        commit('LOGIN_API_fetchUserIsrunning',true);

        const curl = axios.create({
          baseURL: process.env.SIEP_API_GW_INGRESS
        });

        // Header con token
        curl.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

        curl.get('/auth/me')
          .then(function (response) {
            // handle success
            console.log('LOGIN_API_fetchUser SUCCESS',response.data);

            commit('LOGIN_API_updateUser',response.data);
            commit('LOGIN_API_fetchUserIsrunning',false);
          })
          .catch(function (error) {
            // handle error
            console.log('LOGIN_API_fetchUser ERROR', error);

            commit('LOGIN_API_clear');
            commit('LOGIN_API_fetchUserIsrunning',false);
          });
      }
    }
  }
};

export default module
