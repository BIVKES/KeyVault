<template>
    <section class="configurator">
        <div class="container">
            <h1 class="configurator__title">Конфигуратор клавиатуры</h1>

            <div class="stepper">
                <div 
                    v-for="(step, index) in config.steps" 
                    :key="step.id"
                    class="step"
                    :class="{
                        'step--active': config.currentStep === index,
                        'step--completed': config.currentStep > index
                    }"
                >
                    <div class="step__number">
                        {{ config.currentStep > index ? '✓' : index + 1 }}
                    </div>
                    <span class="step__label">{{ step.name }}</span>
                    <div v-if="index < config.steps.length - 1" class="step__line"></div>
                </div>
            </div>

            <div class="configurator__content">

                <div v-if="config.currentStep === 0" class="step-content">
                    <h2 class="step-content__title">Выберите размер</h2>
                    <div class="step-content__grid">
                        <div 
                            v-for="layout in layouts" 
                            :key="layout.id"
                            class="option-card"
                            :class="{ 'option-card--active': config.selectedLayout === layout.id }"
                            @click="config.selectLayout(layout.id)"
                        >
                            <div class="option-card__icon">{{ layout.icon }}</div>
                            <div class="option-card__name">{{ layout.name }}</div>
                            <div class="option-card__desc">{{ layout.keys }} клавиш</div>
                        </div>
                    </div>
                </div>

                <div v-if="config.currentStep === 1" class="step-content">
                    <h2 class="step-content__title">Выберите корпус</h2>
                    <div class="step-content__grid">
                        <div 
                            v-for="caseItem in cases" 
                            :key="caseItem.id"
                            class="option-card"
                            :class="{ 'option-card--active': config.selectedCase === caseItem.id }"
                            @click="config.selectCase(caseItem.id)"
                        >
                            <div class="option-card__icon">{{ caseItem.icon }}</div>
                            <div class="option-card__name">{{ caseItem.name }}</div>
                            <div class="option-card__desc">{{ caseItem.material }}</div>
                            <div class="option-card__price">+{{ caseItem.price }} ₽</div>
                        </div>
                    </div>
                </div>

                <div v-if="config.currentStep === 2" class="step-content">
                    <h2 class="step-content__title">Выберите свитчи</h2>
                    <div class="step-content__list">
                        <div 
                            v-for="switchItem in switches" 
                            :key="switchItem.id"
                            class="option-row"
                            :class="{ 'option-row--active': config.selectedSwitch === switchItem.id }"
                            @click="config.selectSwitch(switchItem.id)"
                        >
                            <div class="option-row__info">
                                <div class="option-row__name">{{ switchItem.name }}</div>
                                <div class="option-row__desc">{{ switchItem.type }} • {{ switchItem.force }}g</div>
                            </div>
                            <div class="option-row__price">{{ switchItem.price }} ₽</div>
                        </div>
                    </div>
                </div>

                <div v-if="config.currentStep === 3" class="step-content">
                    <h2 class="step-content__title">Выберите кейкапы</h2>
                    <div class="step-content__grid">
                        <div 
                            v-for="cap in keycaps" 
                            :key="cap.id"
                            class="option-card"
                            :class="{ 'option-card--active': config.selectedKeycaps === cap.id }"
                            @click="config.selectKeycaps(cap.id)"
                        >
                            <div class="option-card__icon">{{ cap.icon }}</div>
                            <div class="option-card__name">{{ cap.name }}</div>
                            <div class="option-card__desc">{{ cap.profile }}</div>
                            <div class="option-card__price">{{ cap.price }} ₽</div>
                        </div>
                    </div>
                </div>

                <div v-if="config.currentStep === 4" class="step-content">
                    <h2 class="step-content__title">Дополнительные опции</h2>
                    <div class="step-content__list">
                        <div 
                            v-for="extra in extras" 
                            :key="extra.id"
                            class="option-row"
                            :class="{ 'option-row--active': config.selectedExtras.includes(extra.id) }"
                            @click="config.toggleExtra(extra.id)"
                        >
                            <div class="option-row__info">
                                <div class="option-row__name">{{ extra.name }}</div>
                                <div class="option-row__desc">{{ extra.desc }}</div>
                            </div>
                            <div class="option-row__price">+{{ extra.price }} ₽</div>
                        </div>
                    </div>
                </div>

                <div v-if="config.currentStep === 5" class="step-content">
                    <h2 class="step-content__title">Ваша сборка</h2>
                    <div class="summary">
                        <div class="summary__item">
                            <span>Размер</span>
                            <span>{{ config.selectedLayoutObj?.name || '—' }}</span>
                        </div>
                        <div class="summary__item">
                            <span>Корпус</span>
                            <span>{{ config.selectedCaseObj?.name || '—' }}</span>
                        </div>
                        <div class="summary__item">
                            <span>Свитчи</span>
                            <span>{{ config.selectedSwitchObj?.name || '—' }}</span>
                        </div>
                        <div class="summary__item">
                            <span>Кейкапы</span>
                            <span>{{ config.selectedKeycapsObj?.name || '—' }}</span>
                        </div>
                        <div v-if="config.selectedExtrasObjs.length" class="summary__item">
                            <span>Допы</span>
                            <span>{{ config.selectedExtrasObjs.length }} опций</span>
                        </div>
                        <div class="summary__total">
                            <span>Итого</span>
                            <span>{{ config.totalPrice }} ₽</span>
                        </div>
                        <button class="btn btn-primary" @click="addBuildToCart">
                            Добавить сборку в корзину
                        </button>

                    </div>
                </div>

            </div>

            <div class="configurator__nav">
                <BaseButton 
                variant="secondary" 
                size="config"
                v-if="config.currentStep > 0" 
                    class="btn"
                    @click="config.prevStep"
                    :disabled="!config.canProceed"

                >
                    ← Назад
                </BaseButton>
                <BaseButton 
                variant="primary" 
                size="config"
                v-if="config.currentStep < 5" 
                    class="btn btn-primary"
                    :disabled="!config.canProceed"
                    @click="config.nextStep"
                >
                    Далее →
                </BaseButton>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useConfiguratorStore } from '@/stores/configurator'

    import { layouts, cases, switches, keycaps, extras } from '@/data/configurator'

    import { useCartStore } from '@/stores/cart'

    const config = useConfiguratorStore()
    const cart = useCartStore()

    const addBuildToCart = () => {
        const buildProduct = {
            id: Date.now(), 
            name: `Custom ${config.selectedLayoutObj?.name || 'Keyboard'} Build`,
            price: config.totalPrice,
            image: 'images/products/Case1.jpg', 
            specs: [
                config.selectedLayoutObj?.name,
                config.selectedSwitchObj?.name,
                config.selectedCaseObj?.name
            ].filter(Boolean),
            description: 'Кастомная сборка через конфигуратор'
        }

        cart.addToCart(buildProduct)
        config.reset() 
    }
</script>

<style lang="scss" scoped>
    @use './Configurator.scss' as * 
</style>