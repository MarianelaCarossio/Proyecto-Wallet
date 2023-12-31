import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CarteraCrypto from '../views/CarteraCrypto.vue'
import Compra from '../components/NuevaCompra.vue';
import Venta from '../components/NuevaVenta.vue';
import Movimientos from '../components/HistorialMovimientos.vue'
import EstadoActual from '../components/EstadoActual.vue'
import AnalisisInversiones from '../components/AnalisisInversiones.vue'

const routes = [

 {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/cartera',
    name: 'Cartera',
    component: CarteraCrypto
  },
  {
    path: '/NuevaCompra',
    name: 'Compra',
    component: Compra,
  },
  {
    path: '/NuevaVenta',
    name: 'Venta',
    component: Venta,
  },
  {
    path: '/Movimientos',
    name: 'Movimientos',
    component: Movimientos,
  },
  {
    path: '/EstadoActual',
    name: 'EstadoActual',
    component: EstadoActual
  },
  {
    path: '/AnalisisInversiones',
    name: 'AnalisiInversiones',
    component: AnalisisInversiones
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
