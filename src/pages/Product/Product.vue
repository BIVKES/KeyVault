<template>
    <div class="product-page" v-if="product">
        <div class="product-page__grid">
            <div class="product-page__gallery">
                <div class="product-page__main-image">
                    <img :src="product.image" :alt="product.name">
                </div>
            </div>

            <div class="product-page__info">
                <div class="product-page__tags">
                    <span class="spec-chip">{{ product.brand }}</span>
                    <span class="spec-chip">{{ product.type }}</span>
                    <span v-if="product.force" class="spec-chip">{{ product.force }}g</span>
                </div>

                <h1 class="product-page__title">{{ product.name }}</h1>

                <div class="product-page__rating">
                    <span v-for="i in 5" :key="i" class="star">
                        {{ i <= Math.floor(product.rating) ? '★' : '☆' }}
                    </span>
                    <span class="product-page__rating-text">
                        {{ product.rating }} ({{ product.reviews }} отзывов)
                    </span>
                </div>

                <p class="product-page__description">{{ product.description }}</p>

                <div class="product-page__price-block">
                    <div class="product-page__price-label">Цена</div>
                    <div class="product-page__price">
                        {{ Number(product.price).toLocaleString('ru-RU') }} ₽
                    </div>
                    <div class="product-page__stock">✓ В наличии</div>
                </div>

                <div class="product-page__actions">
                    <div class="quantity">
                        <button @click="quantity > 1 && quantity--">−</button>
                        <span>{{ quantity }}</span>
                        <button @click="quantity++">+</button>
                    </div>
                    <BaseButton variant="primary" size="large" @click="addToCart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 2L6 7H3L5.5 20H18.5L21 7H18L15 2H9Z"/>
                        </svg>
                        В корзину
                    </BaseButton>
                </div>
            </div>
        </div>

        <div class="product-page__tabs-card">
            <div class="product-page__tabs-header">
                <button 
                    v-for="tab in tabs" 
                    :key="tab"
                    class="product-page__tab-btn"
                    :class="{ active: activeTab === tab }"
                    @click="activeTab = tab"
                >
                    {{ tab }}
                </button>
            </div>

            <div class="product-page__tabs-content">
                <div v-if="activeTab === 'Описание'">
                    <p class="product-page__tab-text">{{ product.description }}</p>
                    <div class="product-page__specs-grid">
                        <div 
                            v-for="spec in product.specs" 
                            :key="spec"
                            class="product-page__spec-item"
                        >
                            <div class="product-page__spec-label">Характеристика</div>
                            <div class="product-page__spec-value">{{ spec }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="activeTab === 'Характеристики'">
                    <table class="product-page__specs-table">
                        <tr v-for="(value, key) in specsTable" :key="key">
                            <td class="product-page__table-key">{{ key }}</td>
                            <td class="product-page__table-value">{{ value }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="product-page__not-found">
        <h2>Товар не найден</h2>
        <router-link to="/Catalog" class="btn btn-primary">В каталог</router-link>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const productId = Number(route.params.id)
const product = computed(() => productStore.getById(productId))

const quantity = ref(1)
const activeTab = ref('Описание')
const tabs = ['Описание', 'Характеристики']

const specsTable = computed(() => ({
    'Тип': product.value?.type,
    'Бренд': product.value?.brand,
    'Сила нажатия': product.value?.force ? product.value.force + 'g' : 'N/A',
    'Цена': product.value?.price + ' ₽',
    'Рейтинг': product.value?.rating + '/5',
    'Отзывы': product.value?.reviews
}))

function addToCart() {
    if (!product.value) return
    cartStore.addToCart(product.value, quantity.value)
}
</script>

<style lang="scss">
    @use './Product.scss' as *
</style>