<template>
    <section class="hero">
        <div class="hero__content container">
            <span class="hero__new">v2.0 — Новый конфигуратор</span>
            <h1 class="hero__title">Создай свою <span class="hero__title-gradient">идеальную клавиатуру</span></h1>
            <p class="hero__desc">Премиальные свитчи, кейкапы и корпуса. Собери кастомную клавиатуру с нуля в нашем конфигураторе.</p>
            <div class="hero__btn">
                <BaseButton variant="primary" size="#" to="/configurator">
                    ⚡ Начать сборку
                </BaseButton>
                <BaseButton variant="secondary" size="#" to="/catalog">
                    Смотреть каталог
                </BaseButton>
            </div>
            <div class="hero__stats">
                <div class="hero__stats-item">
                    <span class="hero__stats-violet">50+</span>
                    <span class="hero__stats-name">Свитчей</span>
                </div>
                <div class="hero__stats-item">
                    <span class="hero__stats-blue">1000+</span>
                    <span class="hero__stats-name">Сборок</span>
                </div>
                <div class="hero__stats-item">
                    <span class="hero__stats-green">4.9</span>
                    <span class="hero__stats-name">Рейтинг</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    @use './Hero.scss' as *
</style>