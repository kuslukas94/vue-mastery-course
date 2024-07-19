<script setup>
import { ref, onMounted } from 'vue'
import ProductionService from '@/services/ProductionService.js'
import ProductionCard from '@/components/ProductionCard.vue'

const productions = ref(null)

onMounted(() => {
  ProductionService.getProductions()
    .then((response) => {
      productions.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h1>Repertoir</h1>
  <div class="productions">
    <ProductionCard
      v-for="production in productions"
      :key="production.id"
      :production="production"
    />
  </div>
</template>

<style scoped>
.productions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
