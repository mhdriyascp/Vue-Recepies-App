import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddRecepie from '@/components/AddRecepie'
import EditRecepie from '@/components/EditRecepie'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-recepie',
      name: 'AddRecepie',
      component: AddRecepie
    },
    {
      path :'/edit-recepie/:recepie_slug',
      name : 'EditRecepie',
      component: EditRecepie
    }
  ]
})
