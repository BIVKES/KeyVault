<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
  import Header from '@/components/Header/Header.vue'
  import Footer from '@/components/Footer/Footer.vue'

  import { useCartStore } from '@/stores/cart'

  const cart = useCartStore()
  cart.loadFromStorage() 

</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1 0 auto;
  }

  body {
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 12px;
    }
  }
</style>