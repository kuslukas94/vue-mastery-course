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
  if (confirm('Are you sure you want to delete this production?'))
    try {
      await ProductionService.deleteData(props.id)
      GStore.flashMessage = 'The production was deleted'
      setTimeout(() => {
        GStore.flashMessage = ''
      }, 1500)
      router.push('/')
    } catch (err) {
      console.error('Error deleting production:', err)
      GStore.flashMessage = 'Failed to delete the production'
      setTimeout(() => {
        GStore.flashMessage = ''
      }, 1500)
    }
}
</script>

<template>
  <button @click="deleteProduction" class="button">❌</button>
</template>
