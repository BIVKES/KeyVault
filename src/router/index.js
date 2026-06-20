import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import { useScrollStore } from '@/stores/scroll'

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
    scrollBehavior(to, from, savedPosition) {
        const scrollStore = useScrollStore()

        if (savedPosition) {
            return savedPosition
        }

        const savedY = scrollStore.getPosition(to.path)
        if (savedY > 0 && to.path !== from.path) {
            return { top: savedY, behavior: 'instant' }
        }

        return { top: 0 }
    }
})

router.beforeEach((to, from) => {
    const scrollStore = useScrollStore()
    scrollStore.savePosition(from.path, window.scrollY)
})

export default router