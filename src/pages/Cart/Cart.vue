<template>
    <section class="cart-page">
        <div class="cart-page__container container">
            <h1 class="cart-page__title">Корзина</h1>

            <div v-if="cart.isEmpty" class="cart-page__empty">
                <div class="cart-page__empty-icon">🛒</div>
                <h2>Корзина пуста</h2>
                <p>Добавьте товары из каталога или создайте кастомную сборку</p>
                <div class="cart-page__empty-btn">
                    <BaseButton to="/catalog" variant="primary" size="large">
                        В каталог
                    </BaseButton>
                    <BaseButton to="/configurator" variant="secondary" size="large">
                        Создать сборку
                    </BaseButton>
                </div>
            </div>

            <div v-else class="cart-page__layout">
                <div class="cart-page__items">
                    <CartItem 
                        v-for="item in cart.items" 
                        :key="item.id"
                        :item="item"
                        @updateQuantity="handleUpdate"
                        @remove="handleRemove"
                    />
                </div>
                <div class="cart-page__sidebar">
                    <div class="cart-page__summary">
                        <h3>Сумма заказа</h3>
                        <div class="cart-page__row">
                            <span>Товары ({{ cart.totalItems }})</span>
                            <span>{{ cart.totalPrice }} ₽</span>
                        </div>
                        <div class="cart-page__row">
                            <span>Доставка</span>
                            <span class="cart-page__free">Бесплатно</span>
                        </div>
                        <div class="cart-page__row cart-page__total">
                            <span>Итого</span>
                            <span>{{ cart.totalPrice }} ₽</span>
                        </div>
                        <div class="cart-page__btn">
                            <BaseButton to="/checkout" variant="primary" size="large">
                                Оформить заказ
                            </BaseButton>
                            <BaseButton to="/catalog" variant="secondary" size="large">
                                Продолжить покупки
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useCartStore } from '@/stores/cart'
    import CartItem from '@/components/CartItem.vue'

    const cart = useCartStore()

    const handleUpdate = (id, quantity) => {
        cart.updateQuantity(id, quantity)
    }

    const handleRemove = (id) => {
        cart.removeFromCart(id)
    }
</script>

<style lang="scss">
    @use './Cart.scss' as *
</style>