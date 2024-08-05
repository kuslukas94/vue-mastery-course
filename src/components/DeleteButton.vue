<script setup>
import { ref } from 'vue'
import productionService from '../services/productionService'
const id = ref()
//Delete function
const deleteProduction = async () => {
  try {
    const response = await productionService.deleteData(id.value)
    console.log('Delete response:', response)
    //redirect
  } catch (err) {
    console.log('Error deleting production:', err)
  }
}
</script>
<template>
  <button @click="deleteProduction">❌</button>
</template>
