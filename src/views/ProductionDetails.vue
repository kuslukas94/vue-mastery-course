<script setup>
import { ref, onMounted } from 'vue'
import ProductionService from '@/services/ProductionService.js'

const props = defineProps({
  id: {
    required: true
  }
})

const production = ref(null)

onMounted(() => {
  ProductionService.getOneProduction(props.id)
    .then((response) => {
      production.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div v-if="production">
    <h1>{{ production.title }}</h1>
    <p>{{ production.category }}</p>
    <p>{{ production.duration }}</p>
    <p>{{ production.location }}</p>
    <p>{{ production.cast }}</p>
  </div>
</template>

<style scoped>
p {
  text-align: center;
}
</style>
