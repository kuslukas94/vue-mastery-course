<script setup>
import { ref, onMounted } from 'vue'
import ProductionService from '@/services/ProductionService.js'
import ProductionCard from '@/components/ProductionCard.vue'

const data = ref([])

onMounted(() => {
  ProductionService.loadData()
    .then((response) => {
      data.value = response.data.productions
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
      <ProductionCard v-for="production in data" :key="production.id" :production="production" />
    </div>
  </div>
</template>

<style scoped>
#layout-productionList {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #faf7f9;
  padding-top: 1rem;
  margin-top: -1rem;
}
.productions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
