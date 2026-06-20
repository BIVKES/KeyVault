import { defineStore } from 'pinia'
import { products, PRODUCT_TYPES, BRANDS } from '@/data/products.js'

export const useProductStore = defineStore('products', {
    state: () => ({
        products,
        types: PRODUCT_TYPES,
        brands: BRANDS,
        filters: {
            type: 'all',
            brand: 'all',
            maxPrice: 14500
        }
    }),

    getters: {
        filteredProducts: (state) => {
            let result = state.products

            if (state.filters.type !== 'all') {
                result = result.filter(p => p.type === state.filters.type)
            }

            if (state.filters.brand !== 'all') {
                result = result.filter(p => p.brand === state.filters.brand)
            }

            return result.filter(p => p.price <= state.filters.maxPrice)
        },

        getById: (state) => (id) => {
            return state.products.find(p => p.id === id)
        },

        getByType: (state) => (type) => {
            return type === 'all'
                ? state.products
                : state.products.filter(p => p.type === type)
        },

        getByBrand: (state) => (brand) => {
            return brand === 'all'
                ? state.products
                : state.products.filter(p => p.brand === brand)
        },

        bestsellers: (state) => {
            return state.products.filter(p => p.rating >= 4.8).slice(0, 4)
        },

        inStock: (state) => {
            return state.products.filter(p => p.inStock)
        },

        totalCount: (state) => state.products.length,

        filteredCount: (state) => {
            let result = state.products

            if (state.filters.type !== 'all') {
                result = result.filter(p => p.type === state.filters.type)
            }

            if (state.filters.brand !== 'all') {
                result = result.filter(p => p.brand === state.filters.brand)
            }

            return result.filter(p => p.price <= state.filters.maxPrice).length
        }
    },

    actions: {
        setFilter(key, value) {
            this.filters[key] = value
        },

        resetFilters() {
            this.filters = {
                type: 'all',
                brand: 'all',
                maxPrice: 14500
            }
        },

        setMaxPrice(price) {
            this.filters.maxPrice = price
        },

        addProduct(product) {
            this.products.push({
                id: Date.now(),
                ...product
            })
        },

        removeProduct(id) {
            this.products = this.products.filter(p => p.id !== id)
        }
    }
})