import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        wishlist: []
    }),

    getters: {
        totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        isEmpty: (state) => state.items.length === 0,
        isInWishlist: (state) => (id) => state.wishlist.includes(id)
    },

    actions: {
        addToCart(product, quantity = 1) {
            const existing = this.items.find(item => item.id === product.id)
            if (existing) {
                existing.quantity += quantity
            } else {
                this.items.push({ ...product, quantity })
            }
            this.saveToStorage()
        },

        removeFromCart(id) {
            this.items = this.items.filter(item => item.id !== id)
            this.saveToStorage()
        },

        updateQuantity(id, quantity) {
            if (quantity < 1) {
                this.removeFromCart(id)
                return
            }
            const item = this.items.find(item => item.id === id)
            if (item) {
                item.quantity = quantity
                this.saveToStorage()
            }
        },

        clearCart() {
            this.items = []
            this.saveToStorage()
        },

        toggleWishlist(id) {
            const index = this.wishlist.indexOf(id)
            if (index > -1) {
                this.wishlist.splice(index, 1)
            } else {
                this.wishlist.push(id)
            }
            this.saveToStorage()
        },

        saveToStorage() {
            localStorage.setItem('cartItems', JSON.stringify(this.items))
            localStorage.setItem('cartWishlist', JSON.stringify(this.wishlist))
        },

        loadFromStorage() {
            const savedItems = localStorage.getItem('cartItems')
            if (savedItems) {
                this.items = JSON.parse(savedItems)
            }

            const savedWishlist = localStorage.getItem('cartWishlist')
            if (savedWishlist) {
                this.wishlist = JSON.parse(savedWishlist)
            }
        }
    }
})