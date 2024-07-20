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
  <div id="layout-productionList">
    <h1>Repertoir</h1>
    <div class="productions">
      <ProductionCard
        v-for="production in productions"
        :key="production.id"
        :production="production"
      />
    </div>
  </div>
</template>

<style scoped>
#layout-productionList {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.productions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
