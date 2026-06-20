import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Catalog',
        name: 'Catalog',
        component: () => import('@/pages/Catalog/Catalog.vue')
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import('@/pages/Product/Product.vue')
    },
    {
        path: '/Configurator',
        name: 'Configurator',
        component: () => import('@/pages/Configurator/Configurator.vue')
    },
    {
        path: '/Account',
        name: 'Account',
        component: () => import('@/pages/Account/Account.vue')
    },
    {
        path: '/Cart',
        name: 'Cart',
        component: () => import('@/pages/Cart/Cart.vue')
    },
    {
        path: '/Checkout',
        name: 'Checkout',
        component: () => import('@/pages/Checkout/Checkout.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory('/KeyVault/'),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router