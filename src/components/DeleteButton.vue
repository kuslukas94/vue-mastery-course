<script setup>
import { useRouter } from 'vue-router'
import ProductionService from '@/services/productionService.js'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()

const deleteProduction = async () => {
  try {
    const response = await ProductionService.deleteData(props.id)
    console.log('Delete response:', response)
    router.push('/')
  } catch (err) {
    console.log('Error deleting production:', err)
  }
}
</script>

<template>
  <button @click="deleteProduction">❌</button>
</template>
