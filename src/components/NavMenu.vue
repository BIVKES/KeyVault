<template>
    <nav class="nav-menu" :class="`nav-menu--${variant}`">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="nav-menu__link"
      :class="{ 'nav-menu__link--active': route.path === item.to }"
      @click="handleClick"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<script setup>
    import { useRoute } from 'vue-router'

    const props = defineProps({
    variant: {
        type: String,
        default: 'horizontal'
    }
    })

    const emit = defineEmits(['link-click'])

    const route = useRoute()

    const items = [
    { label: 'Главная', to: '/' },
    { label: 'Каталог', to: '/Catalog' },
    { label: 'Конфигуратор', to: '/Configurator' },
    { label: 'Аккаунт', to: '/Account' }
    ]

    const handleClick = () => {
        emit('link-click')
    }
</script>

<style lang="scss" scoped>
.nav-menu {
    z-index: 2;
    display: flex;
    gap: 32px;

    &__link {
        font-size: 16px;
        font-weight: 500;
        color: var(--color-text);
        text-decoration: none;
        transition: all 0.2s ease;
        position: relative;
    }

    &--vertical {
        flex-direction: column;
        gap: 0;

        .nav-menu__link {
            display: block;
            padding: 16px 0;
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            border-bottom: 1px solid var(--border);
            transition: all 0.3s;

            &:hover {
                color: var(--accent);
                padding-left: 8px;
            }

            &--active {
                color: var(--accent);
            }
        }
    }

    &--horizontal {
        .nav-menu__link {
            color: var(--text-secondary);
            opacity: 0.8;

            &:hover {
                color: var(--text-primary);
                opacity: 1;

                &::after {
                    width: 100%;
                }
            }

            &::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 0;
                height: 1px;
                background: var(--accent);
                transition: all 0.4s ease;
            }
        }
    }

    &--footer {
        flex-direction: column;
        gap: 6px;

        .nav-menu__link {
            color: var(--text-secondary);
            font-size: 15px;

            &:hover {
                color: var(--accent);
            }
        }
    }
}

@media (max-width: 768px) {
    .nav-menu--horizontal {
        display: none !important;
    }
}
</style>