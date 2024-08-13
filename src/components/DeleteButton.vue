<script setup>
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import ProductionService from '@/services/productionService.js'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const router = useRouter()
const GStore = inject('GStore')

const deleteProduction = async () => {
  try {
    const response = await ProductionService.deleteData(props.id)
    console.log('Delete response:', response)
    GStore.flashMessage = 'The production was deleted'
    setTimeout(() => {
      GStore.flashMessage = ''
    }, 1500)
    router.push('/')
  } catch (err) {
    console.log('Error deleting production:', err)
  }
}
</script>

<template>
  <button @click="deleteProduction" class="button">❌</button>
</template>
