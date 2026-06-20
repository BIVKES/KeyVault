<template>
    <RouterLink to="/" class="logo" >
        KeyVault
    </RouterLink>
</template>

<script setup>
    defineProps({
        light: { type: Boolean, default: false }
    })
</script>

<style scoped>
    .logo {
        z-index: 2;
        font-size: 24px;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>