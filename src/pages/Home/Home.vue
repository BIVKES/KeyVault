<template>
    <div class="home">
        <Hero />
        <Categories />
        <Bestsellers />
        <Sound />
        <Mailing />
    </div>
</template>

<script setup>
    import Hero from '@/components/Sections/Hero/Hero.vue'
    import Bestsellers from '@/components/Sections/Bestsellers/Bestsellers.vue'
    import Categories from '@/components/Sections/Categories/Categories.vue'
    import Mailing from '@/components/Sections/Mailing/Mailing.vue'
    import Sound from '@/components/Sections/Sound/Sound.vue'
</script>

<style lang="scss" scoped>
    @use './Home.scss' as *
</style>