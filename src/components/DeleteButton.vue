<script setup>
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import ProductionService from '@/services/ProductionService.js'

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
  <button @click="deleteProduction" class="delete-button" title="Delete">❌</button>
</template>

<style lang="scss" scoped>
@import '../styles/mixins';
@import '../styles/variables';

.delete-button {
  @include my-buttons;
}
.delete-button:hover {
  @include my-buttons-hover;
}
</style>