<template>
    <header>
        <div class="header">
            <div class="header-inner container">
                <div class="header-inner__logo">
                    <div class="header-inner__logo-square"></div>
                    <AppLogo />
                </div>

                <!-- Desktop Navigation -->
                <NavMenu variant="horizontal" class="header__nav" />

                <!-- Burger Button (mobile only) -->
                <button 
                    class="header__burger" 
                    @click="toggleMenu"
                    :class="{ 'header__burger--open': isMenuOpen }"
                    aria-label="Открыть меню"
                >
                    <span class="header__burger-line"></span>
                    <span class="header__burger-line"></span>
                    <span class="header__burger-line"></span>
                </button>

                <RouterLink to="/cart" class="header-inner__cart">
                    <span class="header-inner__cart-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 2L6 7H3L5.5 20H18.5L21 7H18L15 2H9Z"/>
                            <path d="M9 11V17M15 11V17"/>
                        </svg>
                    </span>
                    <span v-if="cart.totalItems" class="badge">
                        {{ cart.totalItems }}
                    </span>
                </RouterLink>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <Transition name="slide">
            <div v-if="isMenuOpen" class="mobile-menu" @click.self="closeMenu">
                <div class="mobile-menu__content">
                    <button class="mobile-menu__close" @click="closeMenu" aria-label="Закрыть меню">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                    <NavMenu 
                        variant="vertical" 
                        class="mobile-menu__nav"
                        @link-click="closeMenu"
                    />
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { useCartStore } from '@/stores/cart'

    const cart = useCartStore()
    const isMenuOpen = ref(false)
    const route = useRoute()

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
        document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
    }

    const closeMenu = () => {
        isMenuOpen.value = false
        document.body.style.overflow = ''
    }

    watch(() => route.path, () => {
        closeMenu()
    })
</script>

<style lang="scss" scoped>
    @use './Header.scss' as *
</style>