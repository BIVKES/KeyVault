<template>
    <section class="mailing container">
        <div class="mailing__content">
            <h2 class="mailing__title">Будь в курсе</h2>
            <p class="mailing__subtitle">Подпишись на рассылку и получи скидку 10% на первый заказ</p>
            <div class="mailing__feedback">
                <input class="mailing__input" type="email" placeholder="your@email.com">
                <BaseButton variant="primary" size="#" to="/catalog">
                    Подписаться
                </BaseButton>
            </div>    
        </div>
    </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    @use './Mailing.scss' as *
</style>