<template>
    <component
    :is="tag"
    :to="to"
    :href="href"
    class="btn"
    :class="[
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--full': full }
    ]"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'medium' },
    full: Boolean,
    to: String,
    href: String
  })

  const emit = defineEmits(['click'])

  const tag = computed(() => {
    if (props.to) return 'RouterLink'
    if (props.href) return 'a'
    return 'button'
  })

  const handleClick = (event) => {
    emit('click', event)
  }
</script>

<style scoped>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.4s ease;
    border-radius: 15px;  
  }

  .btn--primary {
    padding: 16px 32px;
    background: var(--accent);
    color: var(--text-primary);
    font-size: 18px;
    min-width: 250px;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  }

  .btn--primary:hover {
    transform: translateY(-3px);
  }

  .btn--secondary {
    padding: 16px 32px;
    color: var(--accent);
    border: 2px solid var(--accent);
    font-size: 18px;
    min-width: 250px;
  }

  .btn--secondary:hover {
    background: var(--accent);
    color: var(--color-surface);
    transform: translateY(-3px);
  } 

  .btn--config {
    max-width: 200px;
    padding: 20px 27px;
    font-size: 16px;
  }

  .btn--large {
    max-width: 100px;
    padding: 20px 27px;
    font-size: 16px;
  }
</style>

