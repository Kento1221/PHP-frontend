import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Import from '../views/Import.vue'
import Customer from '../views/Customer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/import',
    name: 'Import',
    component: Import
  },
  {
    path: '/customer/:customer_id?',
    name: 'Customer',
    component: Customer
  },
]

const router = new VueRouter({
  routes
})

export default router
