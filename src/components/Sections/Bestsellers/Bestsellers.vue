<<template>
    <section class="bestsellers">
        <div class="bestsellers__container container">
            <div class="bestsellers__header">
                <div>
                    <h2 class="bestsellers__title">Хиты продаж</h2>
                    <p class="bestsellers__subtitle">Самые популярные товары этого месяца</p>
                </div>
                    <RouterLink to="/catalog">
                        <button class="bestsellers__btn">Все товары</button>
                    </RouterLink>
            </div>
            
            <div class="bestsellers__grid">
                <ProductCard 
                    v-for="product in bestsellers" 
                    :key="product.id"
                    :product="product"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
    import { computed } from 'vue'
    import { useProductStore } from '@/stores/products'
    import ProductCard from '@/components/ProductCard.vue'
    
    const store = useProductStore()
     
    const bestsellers = computed(() => store.products.filter(p => p.rating >= 4.5).slice(0, 4))
</script>

<style lang="scss" scoped>
    @use './Bestsellers.scss' as *
</style>