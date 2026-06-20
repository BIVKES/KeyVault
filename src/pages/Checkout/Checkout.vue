<template>
    <div class="checkout-page">
        <h1 class="checkout-page__title">Оформление заказа</h1>
        <p class="checkout-page__subtitle">Заполните данные для доставки</p>

        <div class="checkout-page__grid">
            <div class="checkout-page__form">
                <div class="checkout-page__card">
                    <h3>Контактные данные</h3>
                    <div class="input-group">
                        <label>Имя</label>
                        <input type="text" class="input" v-model="form.name" placeholder="Иван Иванов">
                    </div>
                    <div class="input-group">
                        <label>Email</label>
                        <input type="email" class="input" v-model="form.email" placeholder="ivan@example.com">
                    </div>
                    <div class="input-group">
                        <label>Телефон</label>
                        <input type="tel" class="input" v-model="form.phone" placeholder="+7 (999) 123-45-67">
                    </div>
                    <div class="input-group">
                        <label>Адрес</label>
                        <input type="text" class="input" v-model="form.address" placeholder="г. Москва, ул. Примерная, д. 1">
                    </div>
                </div>

                <div class="checkout-page__card">
                    <h3>Способ доставки</h3>
                    <div 
                        v-for="method in shippingMethods" 
                        :key="method.id"
                        class="checkout-page__method"
                        :class="{ active: selectedShipping === method.id }"
                        @click="selectedShipping = method.id"
                    >
                        <div>
                            <div class="checkout-page__method-name">{{ method.name }}</div>
                            <div class="checkout-page__method-time">{{ method.time }}</div>
                        </div>
                        <div class="checkout-page__method-price">
                            {{ method.price === 0 ? 'Бесплатно' : method.price + ' ₽' }}
                        </div>
                    </div>
                </div>
                <div class="checkout-page__btn">
                    <BaseButton 
                        variant="primary" 
                        size="large" 
                        @click="placeOrder"
                        :disabled="placing"
                    >
                        {{ placing ? 'Оформляем...' : 'Подтвердить заказ' }}
                    </BaseButton>
                </div>
            </div>

            <div class="checkout-page__summary">
                <div class="checkout-page__card">
                    <h3>Ваш заказ</h3>
                    <div 
                        v-for="item in cartStore.items" 
                        :key="item.id"
                        class="checkout-page__item"
                    >
                        <span>{{ item.name }} x {{ item.quantity }}</span>
                        <span>{{ item.price * item.quantity }} ₽</span>
                    </div>
                    <div class="checkout-page__total">
                        <span>Итого</span>
                        <span>{{ cartStore.totalPrice }} ₽</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/orders'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const form = ref({
    name: '',
    email: '',
    phone: '',
    address: ''
})

const selectedShipping = ref('standard')
const placing = ref(false)

const shippingMethods = [
    { id: 'standard', name: 'Стандартная доставка', time: '3-5 дней', price: 0 },
    { id: 'express', name: 'Экспресс доставка', time: '1-2 дня', price: 350 }
]
const shippingPrice = computed(() => {
    const method = shippingMethods.find(s => s.id === selectedShipping.value)
    return method ? method.price : 0
})

function placeOrder() {
    if (!form.value.name || !form.value.phone || !form.value.address) {
        alert('Заполните все поля')
        return
    }

    placing.value = true

    setTimeout(() => {
        orderStore.addOrder({
            total: cartStore.totalPrice + shippingPrice.value,
            items: cartStore.totalItems
        })

        cartStore.clearCart()
        placing.value = false
        alert('Заказ успешно оформлен!')
        router.push('/Account')
    }, 1500)
}
</script>

<style lang="scss">
    @use './Checkout.scss'
</style>