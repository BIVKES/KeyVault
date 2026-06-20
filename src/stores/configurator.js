import { defineStore } from 'pinia'
import { layouts, cases, switches, keycaps, extras } from '@/data/configurator'

export const useConfiguratorStore = defineStore('configurator', {
    state: () => ({
        currentStep: 0,       
        selectedLayout: null,    
        selectedCase: null,     
        selectedSwitch: null,     
        selectedKeycaps: null,     
        selectedExtras: []        
    }),

    getters: {
        steps: () => [
            { id: 'layout', name: 'Размер' },
            { id: 'case', name: 'Корпус' },
            { id: 'switch', name: 'Свитчи' },
            { id: 'keycaps', name: 'Кейкапы' },
            { id: 'extras', name: 'Допы' },
            { id: 'summary', name: 'Итог' }
        ],

        selectedLayoutObj: (state) => {
            return state.selectedLayout 
                ? layouts.find(item => item.id === state.selectedLayout) 
                : null
        },

        selectedCaseObj: (state) => {
            return state.selectedCase 
                ? cases.find(item => item.id === state.selectedCase) 
                : null
        },

        selectedSwitchObj: (state) => {
            return state.selectedSwitch 
                ? switches.find(item => item.id === state.selectedSwitch) 
                : null
        },

        selectedKeycapsObj: (state) => {
            return state.selectedKeycaps 
                ? keycaps.find(item => item.id === state.selectedKeycaps) 
                : null
        },

        selectedExtrasObjs: (state) => {
            return extras.filter(item => state.selectedExtras.includes(item.id))
        },

        totalPrice() {
            let total = 0

            if (this.selectedCaseObj) total += this.selectedCaseObj.price
            if (this.selectedSwitchObj) total += this.selectedSwitchObj.price
            if (this.selectedKeycapsObj) total += this.selectedKeycapsObj.price

            this.selectedExtrasObjs.forEach(item => total += item.price)

            return total
            },

        canProceed: (state) => {
            if (state.currentStep === 0) return state.selectedLayout !== null  // размер выбран?
            if (state.currentStep === 1) return state.selectedCase !== null    // корпус выбран?
            if (state.currentStep === 2) return state.selectedSwitch !== null   // свитчи выбраны?
            if (state.currentStep === 3) return state.selectedKeycaps !== null  // кейкапы выбраны?
            return true 
        }
    },

    actions: {
        nextStep() {
            if (this.currentStep < 5) this.currentStep++
        },

        prevStep() {
            if (this.currentStep > 0) this.currentStep--
        },

        setStep(index) {
            this.currentStep = index
        },

        selectLayout(id) {
            this.selectedLayout = id
        },

        selectCase(id) {
            this.selectedCase = id
        },

        selectSwitch(id) {
            this.selectedSwitch = id
        },

        selectKeycaps(id) {
            this.selectedKeycaps = id
        },

        toggleExtra(id) {
            const index = this.selectedExtras.indexOf(id)
            if (index > -1) {
                this.selectedExtras.splice(index, 1) 
            } else {
                this.selectedExtras.push(id) 
            }
        },

        reset() {
            this.currentStep = 0
            this.selectedLayout = null
            this.selectedCase = null
            this.selectedSwitch = null
            this.selectedKeycaps = null
            this.selectedExtras = []
        }
    }
})