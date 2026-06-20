<template>
    <div class="catalog__filters">
        <button 
            @click="setType('all')"
            :class="{ 'active': filters.type === 'all' }"
        >Все
        </button>

        <button 
            v-for="type in types"
            :key="type"
            :class="{ 'active': filters.type === type }"
            @click="setType(type)"
        >{{ type }}</button>
    </div>

    <div class="catalog__price">
        <span>Цена: </span>
        <input 
            type="range"
            min="0"
            max="14500"
            :value="filters.maxPrice"
            @input="setPrice($event.target.value)"
        >
        <span>до {{ filters.maxPrice }} ₽</span>
    </div>
</template>

<script setup>
    import { useProductStore } from '@/stores/products'
    import { storeToRefs } from 'pinia'

    const store = useProductStore()
    const { types, filters } = storeToRefs(store)

    const setType = (type) => {
        store.setFilter('type', type)
    }

    const setPrice = (value) => {
        store.setFilter('maxPrice', Number(value))
    }
</script>

<style lang="scss" scoped>
.catalog {
    &__filters {
        margin: 15px 0;
        display: flex;
        gap: 8px;
    }

    &__price {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 32px;
    }
}

button {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s;

    &.active {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
    }

    &:hover:not(.active) {
        border-color: var(--accent);
        color: var(--text-primary);
    }
}

input[type="range"] {
    width: 200px;
    background: var(--bg-hover);
    outline: none;
    -webkit-appearance: none;
    border-radius: 3px;
    height: 5px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: var(--accent);
        border-radius: 50%;
        cursor: pointer;
    }
}

@media (max-width: 768px) {
    .catalog {
        &__filters {
            flex-wrap: wrap;
        }

        &__price {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 16px;
        }
    }

    button {
        padding: 5px 5px;
        font-size: 11px;
    }

    input[type="range"] {
        width: 100%;
    }
}
</style>