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

  ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 15px;
  }

  ::-webkit-scrollbar-track {
      background: var(--bg-card);
      border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
      background: var(--accent);
      border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
      background: var(--accent-secondary);
  }

  * {
      scrollbar-width: thin;
      scrollbar-color: var(--accent) var(--bg-card);
  }
</style>