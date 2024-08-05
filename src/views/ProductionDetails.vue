<script setup>
import { ref, onMounted, watch } from 'vue'
import ProductionService from '@/services/productionService.js'

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
  <div class="layout" v-if="production">
    <h1>{{ production.title }}</h1>
    <p><b>Category:</b> {{ production.category }}</p>
    <p><b>Duration:</b> {{ production.duration }} min</p>
    <p><b>Location:</b> {{ production.location }}</p>
    <p><b>Cast:</b> {{ production.cast }}</p>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/mixins';

.layout {
  background-color: $main-background-color;
  padding-top: 1rem;
  padding-bottom: 2rem;
  width: 98vw;
  @include border-card;
}
p {
  text-align: center;
}
</style>
