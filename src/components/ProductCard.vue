<template>
    <div class="product-card">
        <router-link :to="'/product/' + product.id" class="product-card__link">
            <div class="product-card__image">
                <img :src="product.image" :alt="product.name">
                <span v-if="product.badge" class="product-card__badge">
                    {{ product.badge }}
                </span>
            </div>
        </router-link>
        <div class="product-card__body">
            <div class="product-card__specs">
                <span v-for="spec in product.specs" :key="spec" class="spec-chip">
                    {{ spec }}
                </span>
            </div>
            <router-link :to="'/product/' + product.id" class="product-card__title-link">
                <h3 class="product-card__title">{{ product.name }}</h3>
            </router-link>
            <div class="product-card__rating">
                <span class="star">★</span>
                <span>{{ product.rating }} ({{ product.reviews }})</span>
            </div>
            <div class="product-card__price">{{ Number(product.price).toLocaleString('ru-RU') }} ₽</div>

            <!-- Add button -->
            <button 
                v-if="!isInCart"
                class="product-card__add-btn" 
                @click.stop="addToCart"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14M5 12h14"/>
                </svg>
            </button>

            <!-- Remove button (green) -->
            <button 
                v-else
                class="product-card__remove-btn" 
                @click.stop="removeFromCart"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useCartStore } from '@/stores/cart'

    const props = defineProps({
        product: { type: Object, required: true }
    })

    const cartStore = useCartStore()

    const isInCart = computed(() => {
        return cartStore.items.some(item => item.id === props.product.id)
    })

    const addToCart = () => {
        cartStore.addToCart(props.product)
    }

    const removeFromCart = () => {
        cartStore.removeFromCart(props.product.id)
    }
</script>

<style lang="scss" scoped>
.product-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.4s ease;
    cursor: pointer;
    position: relative;

    &:hover {
        border-color: rgba(139, 92, 246, 0.3);
        transform: translateY(-4px);
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);

        .product-card__image {
            img {
                transform: scale(1.05);
            }
        }

        .product-card__add-btn {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &__link {
        display: block;
        text-decoration: none;
    }

    &__title-link {
        text-decoration: none;
        color: inherit;

        &:hover {
            .product-card__title {
                color: var(--accent);
            }
        }
    }

    &__image {
        position: relative;
        height: 220px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
    }

    &__badge {
        position: absolute;
        top: 16px;
        left: 16px;
        padding: 4px 12px;
        background: rgba(139, 92, 246, 0.9);
        border-radius: 100px;
        font-size: 12px;
        font-weight: 600;
        color: white;
    }

    &__body {
        padding: 20px;
    }

    &__specs {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    &__title {
        font-size: 17.6px;
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--text-primary);
    }

    &__rating {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        font-size: 13.6px;
        color: var(--text-secondary);

        .star {
            color: #FBBF24;
        }
    }

    &__price {
        font-family: 'JetBrains Mono', monospace;
        font-size: 17.6px;
        font-weight: 600;
        color: var(--accent-secondary);
    }

    &__add-btn {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: var(--accent);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;

        &:hover {
            background: #7C3AED;
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
    }

    &__remove-btn {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: var(--success);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
            background: #16a34a;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
    }
}

.spec-chip {
    padding: 4px 8px;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 6px;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    color: var(--accent);
}

@media (max-width: 768px) {
    .product-card {
        &__image {
            height: 180px;
        }

        &__body {
            padding: 14px;
        }

        &__title {
            font-size: 15px;
        }

        &__price {
            font-size: 15px;
        }

        &__add-btn,
        &__remove-btn {
            opacity: 1;
            transform: translateY(0);
            width: 36px;
            height: 36px;
            bottom: 14px;
            right: 14px;
        }
    }
}

@media (max-width: 480px) {
    .product-card {
        &__image {
            height: 200px;
        }
    }

    .spec-chip {
        font-size: 11px;
        padding: 3px 6px;
    }
}
</style>