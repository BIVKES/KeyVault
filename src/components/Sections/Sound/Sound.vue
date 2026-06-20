<template>
    <section class="sound">
        <div class="sound__container container">
            <div class="sound__grid">
                <div class="sound__lab">
                    <h2 class="sound__lab-title">Sound Lab</h2>
                    <p class="sound__lab-subtitle">Послушай, как звучат разные свитчи перед покупкой</p>
                    <div class="sound__lab-list">
                        <div 
                            v-for="sound in sounds" 
                            :key="sound.id"
                            class="sound__lab-item"
                            :class="{ 'sound__lab-item--active': activeSound === sound.id }"
                            @click="toggleSound(sound.id)"
                        >
                            <div class="sound__lab-info">
                                <div class="sound__lab-name">{{ sound.name }}</div>
                                <div class="sound__lab-desc">{{ sound.desc }}</div>
                                <div v-if="activeSound === sound.id" class="sound__lab-visualizer">
                                    <div class="sound__lab-bar"></div>
                                </div>
                            </div>
                            <div class="sound__lab-play">
                                <svg v-if="activeSound === sound.id" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                                </svg>
                                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </div>
                    </div>    
                </div>
                <div class="sound__emoji">
                    🎹
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref } from 'vue'

    const activeSound = ref(null)
    const currentAudio = ref(null)

    const sounds = [
        { 
            id: 'oil-king', 
            name: 'Gateron Oil King', 
            desc: 'Deep, thocky linear',
            audio: 'audio/gateron-oil-king.mp3'
        },
        { 
            id: 'holy-panda', 
            name: 'Holy Panda', 
            desc: 'Tactile, marbly',
            audio: 'audio/holy-panda.mp3'
        },
        { 
            id: 'box-white', 
            name: 'Kailh Box White', 
            desc: 'Clicky, crisp',
            audio: 'audio/kailh-box-white.mp3'
        },
        { 
            id: 'mx-brown', 
            name: 'Cherry MX Brown', 
            desc: 'Tactile, classic',
            audio: 'audio/cherry-mx-brown.mp3'
        }
    ]

    const toggleSound = (id) => {
        if (activeSound.value === id) {
            stopAudio()
            return
        }

        stopAudio()

    
        const sound = sounds.find(s => s.id === id)
        if (!sound || !sound.audio) return

        const audio = new Audio(sound.audio)
        audio.loop = true
        audio.play().catch(err => console.log('Audio error:', err))

        currentAudio.value = audio
        activeSound.value = id
    }

    const stopAudio = () => {
        if (currentAudio.value) {
            currentAudio.value.pause()
            currentAudio.value.currentTime = 0
            currentAudio.value = null
        }
        activeSound.value = null
    }
</script>

<style lang="scss">
    @use './Sound.scss' as *
</style>