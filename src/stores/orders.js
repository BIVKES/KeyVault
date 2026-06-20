import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orders', {
    state: () => ({
        orders: []
    }),

    getters: {
        shippingOrders: (state) => {
            return state.orders.filter(order => order.status === 'shipping')
        },
        
        allOrders: (state) => state.orders
    },

    actions: {
        addOrder(order) {
            const newOrder = {
                id: `KV-${new Date().getFullYear()}-${String(this.orders.length + 1).padStart(3, '0')}`,
                date: new Date().toISOString().split('T')[0],
                status: 'shipping',
                ...order
            }
            this.orders.push(newOrder)
            this.saveToStorage()
        },

        saveToStorage() {
            localStorage.setItem('orders', JSON.stringify(this.orders))
        },

        loadFromStorage() {
            const saved = localStorage.getItem('orders')
            if (saved) {
                this.orders = JSON.parse(saved)
            }
        }
    }
})