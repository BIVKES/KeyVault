<template>
    <div class="account-page">
        <h1 class="account-page__title">Личный кабинет</h1>
        <p class="account-page__subtitle">Управляйте заказами и настройками</p>

        <div class="account-page__grid">
            <div class="account-page__sidebar">
                <div class="account-page__profile">
                    <div class="account-page__avatar">👤</div>
                    <div class="account-page__name">Юрий Ш.</div>
                    <div class="account-page__email">alex@example.com</div>
                </div>
                <div class="account-page__nav">
                    <button class="account-page__nav-btn active">
                        📦 Заказы
                    </button>
                </div>
            </div>

            <div class="account-page__content">
                <h2 class="account-page__section-title">Мои заказы</h2>

                <div v-if="shippingOrders.length === 0" class="account-page__empty">
                    <p>Нет заказов в пути</p>
                </div>

                <div 
                    v-for="order in shippingOrders" 
                    :key="order.id" 
                    class="account-page__order"
                >
                    <div class="account-page__order-header">
                        <div>
                            <div class="account-page__order-id">{{ order.id }}</div>
                            <div class="account-page__order-date">{{ order.date }}</div>
                        </div>
                        <div class="account-page__order-status account-page__order-status--shipping">
                            В пути
                        </div>
                    </div>
                    <div class="account-page__order-footer">
                        <span class="account-page__order-items">{{ order.items }} товаров</span>
                        <span class="account-page__order-total">{{ order.total }} ₽</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orders'

const orderStore = useOrderStore()

const shippingOrders = computed(() => {
    if (!orderStore || !orderStore.orders) return []
    return orderStore.orders.filter(order => order.status === 'shipping')
})
</script>

<style lang="scss">
    @use './Account.scss' as *
</style>