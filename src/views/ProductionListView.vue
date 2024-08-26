<script setup>
import { ref, onMounted, inject } from 'vue'
import ProductionService from '@/services/ProductionService.js'
import ProductionCard from '@/components/ProductionCard.vue'
import NotificationComponent from '../components/NotificationComponent.vue'
import { useRouter } from 'vue-router'

const data = ref([])
const router = useRouter()
const GStore = inject('GStore')

onMounted(() => {
  ProductionService.fetchData()
    .then((productions) => {
      data.value = productions
    })
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      router.push({ name: 'network-error' })
    })
})
</script>

<template>
  <NotificationComponent v-if="GStore.flashMessage" />
  <div class="layout">
    <h1>Repertoir</h1>
    <div class="productions">
      <ProductionCard v-for="production in data" :key="production.id" :production="production" />
    </div>
  </div>
</template>

<style scoped>
.layout {
  text-align: left;
}
.productions {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 15px;
}
</style>
