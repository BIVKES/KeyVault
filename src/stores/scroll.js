import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScrollStore = defineStore('scroll', () => {
    const positions = ref({})
    
    const savePosition = (path, y) => {
        positions.value[path] = y
    }
    
    const getPosition = (path) => {
        return positions.value[path] || 0
    }
    
    return { positions, savePosition, getPosition }
})