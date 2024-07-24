<script setup>
import { ref, onMounted, watch } from 'vue'
import ProductionService from '@/services/ProductionService.js'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const production = ref(null)

// Funkce pro načtení dat podle ID
const loadProductionData = (id) => {
  ProductionService.loadData()
    .then((response) => {
      console.log('Response Data:', response.data)
      const matchedProduction = response.data.productions.find((p) => p.id === id)
      production.value = matchedProduction || null
      console.log('Production Data:', production.value)
    })
    .catch((error) => {
      console.error('Error loading production data:', error)
    })
}

onMounted(() => {
  loadProductionData(props.id)
})

watch(
  () => props.id,
  (newId) => {
    if (newId !== undefined) {
      loadProductionData(newId)
    }
  }
)
</script>

<template>
  <div id="layout-productionDetails" v-if="production">
    <h1>{{ production.title }}</h1>
    <p><b>Category:</b> {{ production.category }}</p>
    <p><b>Duration:</b> {{ production.duration }} min</p>
    <p><b>Location:</b> {{ production.location }}</p>
    <p><b>Cast:</b> {{ production.cast }}</p>
  </div>
</template>

<style scoped>
#layout-productionDetails {
  color: #150e12;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #a37596;
  padding-top: 1rem;
  padding-bottom: 2rem;
}
p {
  text-align: center;
}
</style>
