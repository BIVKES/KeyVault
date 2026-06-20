<template>
    <div class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-item__image">

        <div class="cart-item__info">
            <div class="cart-item__name">{{ item.name }}</div>
            <div class="cart-item__specs">{{ item.type }} {{ item.force }}g</div>
        </div>

        <div class="cart-item__quantity">
            <button @click="decrease">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increase">+</button>
        </div>

        <div class="cart-item__price">
            <div>{{ item.price }} ₽</div>
            <div>{{ item.price * item.quantity }} ₽</div>
        </div>

        <button @click="removeItem" class="cart-item__remove">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
        </button>
    </div>
</template>

<script setup>
    const props = defineProps({
        item: { type: Object, required: true }
    })

    const emit = defineEmits(['updateQuantity', 'remove'])

    const decrease = () => {
        emit('updateQuantity', props.item.id, props.item.quantity - 1)
    }

    const increase = () => {
        emit('updateQuantity', props.item.id, props.item.quantity + 1)
    }

    const removeItem = () => {
        emit('remove', props.item.id)
    }
</script>

<style lang="scss" scoped>
    .cart-item {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 16px;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
                border-color: rgba(139, 92, 246, 0.3);
                box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
                transform: translateY(-3px);
            }

    &__image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
    }

    &__info {
        flex: 1;
    }

    &__name {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 8px;
    }

    &__specs {
        color: var(--text-secondary);
        font-size: 14px;
    }

    &__quantity {
        display: flex;
        align-items: center;
        gap: 8px;

        button {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: var(--bg-hover);
            border: 1px solid var(--border);
            color: var(--text-primary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }

        span {
            width: 40px;
            text-align: center;
            font-weight: 600;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
        }
    }

    &__price {
        text-align: right;
        font-family: 'JetBrains Mono', monospace;
        min-width: 80px;

        div:first-child {
            color: var(--text-secondary);
            font-size: 14px;
            margin-bottom: 4px;
        }

        div:last-child {
            color: var(--accent-secondary);
            font-weight: 600;
            font-size: 16px;
        }
    }

    &__remove {
        background: transparent;
        border: none;
        color: var(--error);
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;

        &:hover {
            color: #EF4444;
        }
    }
}

@media (max-width: 768px) {
    .cart-item {
        flex-wrap: wrap;
        gap: 12px;
        padding: 16px;

        &__image {
            width: 60px;
            height: 60px;
        }

        &__info {
            flex: 1;
            min-width: 150px;
        }

        &__name {
            font-size: 14px;
            margin-bottom: 4px;
        }

        &__quantity {
            order: 3;

            button {
                width: 28px;
                height: 28px;
            }

            span {
                width: 30px;
            }
        }

        &__price {
            order: 2;
            min-width: auto;

            div:last-child {
                font-size: 14px;
            }
        }

        &__remove {
            order: 4;
            padding: 6px;
        }
    }
}

@media (max-width: 480px) {
    .cart-item {
        &__info {
            width: 100%;
            min-width: auto;
        }

        &__quantity {
            order: 2;
        }

        &__price {
            order: 3;
            margin-left: auto;
        }

        &__remove {
            order: 5;
            width: 100%;
            justify-content: center;
            padding: 8px;
            border: 1px solid var(--border);
            border-radius: 8px;
        }
    }
}
</style>