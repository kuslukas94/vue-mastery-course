<script setup>
import { reactive, inject } from 'vue'
import ProductionService from '@/services/ProductionService.js'
import FormCard from '@/components/FormCard.vue'
import NotificationComponent from '@/components//NotificationComponent.vue'

const initialProductions = () => ({
  title: '',
  category: '',
  duration: '',
  location: 'Big scene', // Default value for select
  cast: []
})
const productions = reactive(initialProductions())
const GStore = inject('GStore')

const onSubmit = async () => {
  try {
    await ProductionService.saveData({ ...productions })
    GStore.flashMessage = 'Data saved successfully'
    setTimeout(() => {
      GStore.flashMessage = ''
    }, 1500)
    Object.assign(productions, initialProductions())
  } catch (err) {
    console.error('Error saving data', err)
  }
}
</script>

<template>
  <NotificationComponent v-if="GStore.flashMessage" />
  <div class="title">
    <h1>Add new production</h1>
  </div>
  <FormCard :productions="productions" :onSubmit="onSubmit" />
</template>
