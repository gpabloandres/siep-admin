import Vue from 'vue'
import Router from 'vue-router'

// Paginas
import login_api from '@/components/login_api'
import home from '@/pages/home'
import rrhh_alumnos_nominal from '@/pages/rrhh/alumnos_nominal'
import matriculas_cuantitativa_por_seccion from '@/pages/matriculas/cuantitativa_por_seccion'
import instituciones from '@/pages/instituciones'
import mantenimiento from '@/pages/mantenimiento'
import administracion from '@/pages/administracion'

// ABM
import roles from '@/pages/abm/roles'
import usuarios from '@/pages/abm/usuarios'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: home
    },
    {
      path: '/rrhh/alumnos_nominal',
      name: 'rrhh_alumnos_nominal',
      component: rrhh_alumnos_nominal
    },
    {
      path: '/matriculas/cuantitativa/por_seccion',
      name: 'matriculas_cuantitativa_por_seccion',
      component: matriculas_cuantitativa_por_seccion
    },
    {
      path:'/instituciones',
      name:'instituciones',
      component: instituciones
    },
    {
      path:'/logout',
      name:'logout',
      component: login_api
    },
    //ABM
    {
      path:'/abm/usuarios',
      name:'abm.usuarios',
      component: usuarios
    },
    // ADMINISTRACIÓN | MANTENIMIENTO
    {
      path: '/administrar',
      name: 'administrar',
      component: administracion
    },
    {
      path: '/mantenimiento',
      name: 'mantenimiento',
      component: mantenimiento
    }
  ]/*,
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }*/
})
