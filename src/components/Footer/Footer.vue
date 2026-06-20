<template>
    <footer class="footer">
        <div class="footer__content container">
            <div class="footer__grid">
                <div class="footer__logo">
                    <AppLogo />
                    <p class="footer__desc">Премиальные кастомные клавиатуры, свитчи и аксессуары для энтузиастов. Создай свою идеальную клавиатуру с нуля.</p>
                </div>
                <div class="footer__menu">
                    <h3 class="footer__menu-title">Меню</h3>
                    <NavMenu
                        variant="footer"
                    />
                </div>
                <div class="footer__info">
                    <h3 class="footer__menu-title">Информация</h3>
                    <a href="#" class="footer__menu-link">Доставка</a>
                    <a href="#" class="footer__menu-link">Возврат</a>
                    <a href="#" class="footer__menu-link">Гарантия</a>
                    <a href="#" class="footer__menu-link">FAQ</a>
                </div>
                <div class="footer__contacts">
                    <h3 class="footer__menu-title">Контакты</h3>
                    <a href="#" class="footer__menu-link">support@keyvault.ru</a>
                    <a href="#" class="footer__menu-link">+7 (999) 123-45-67</a>
                    <a href="#" class="footer__menu-link">Telegram</a>
                    <a href="#" class="footer__menu-link">Discord</a>
                </div>
            </div>
            <hr class="footer__hr" />
            <div class="footer__copyright">&copy; 2026 KeyVault. Все права защищены.</div>
        </div>
    </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    @use './Footer.scss' as *
</style>