<template>
    <section class="catalog">
        <div class="container">
            <div class="catalog__header">
                <h1 class="catalog__title">Каталог</h1>
            </div>

            <CatalogFilters />
            <span>{{ filteredProducts.length }} товаров</span>
            <div class="catalog__grid">
                <ProductCard 
                    v-for="product in filteredProducts"
                    :key="product.id"
                    :product="product"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
    import CatalogFilters from '@/components/CatalogFilters.vue'
    import { storeToRefs } from 'pinia'
    import { useProductStore } from '@/stores/products.js'
    import  ProductCard  from '@/components/ProductCard.vue'

    const store = useProductStore()
    const { filteredProducts } = storeToRefs(store)
</script>

<style lang="scss" scoped>
    @use './Catalog.scss' as *
</style>