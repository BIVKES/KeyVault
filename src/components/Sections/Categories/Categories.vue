<template>
    <section class="categories container">
        <div class="categories__content">
            <h2 class="categories__title">Категории</h2>
            <p class="categories__desc">Всё для создания идеальной клавиатуры</p>
            <div @click="goToCatalog" class="categories__grid">
                <div class="categories__grid-item">
                    <div class="categories__grid-item-emoji">🔘</div>
                    <h3 class="categories__grid-item-title">Свитчи</h3>
                    <p class="categories__grid-item-desc">Linear, Tactile, Clicky</p>
                </div>
                <div class="categories__grid-item">
                    <div class="categories__grid-item-emoji">🎨</div>
                    <h3 class="categories__grid-item-title">Кейкапы</h3>
                    <p class="categories__grid-item-desc">ABS, PBT, металл</p>
                </div>
                <div class="categories__grid-item">
                    <div class="categories__grid-item-emoji">🏗️</div>
                    <h3 class="categories__grid-item-title">Корпуса</h3>
                    <p class="categories__grid-item-desc">Алюминий, поликарбонат</p>
                </div>
                <div class="categories__grid-item">
                    <div class="categories__grid-item-emoji">🔧</div>
                    <h3 class="categories__grid-item-title">Аксессуары</h3>
                    <p class="categories__grid-item-desc">Стабилизаторы, смазка</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import {useRouter} from 'vue-router'

    const router = useRouter()

    const goToCatalog = () => {
        router.push('/Catalog')
    }
</script>

<style lang="scss" scoped>
    @use './Categories.scss' as *
</style>