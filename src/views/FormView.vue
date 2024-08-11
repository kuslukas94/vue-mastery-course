<script setup>
import { reactive, inject } from 'vue'
import ProductionService from '@/services/productionService.js'
import myUUID from '@/stores/UUID'
import FormCard from '@/components/FormCard.vue'
import NotificationComponent from '@/components//NotificationComponent.vue'

const initialProductions = () => ({
  id: myUUID(),
  title: '',
  category: '',
  duration: '',
  location: 'Big scene', // Default value for select
  cast: ''
})
const productions = reactive(initialProductions())
const GStore = inject('GStore')

const onSubmit = async () => {
  try {
    const response = await ProductionService.saveData({ ...productions })
    console.log('Response', response)
    GStore.flashMessage = 'Data saved successfully'
    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)
    Object.assign(productions, initialProductions())
  } catch (err) {
    console.log('Error', err)
  }
}
</script>

<template>
  <FormCard :productions="productions" :onSubmit="onSubmit" />
  <NotificationComponent v-if="GStore.flashMessage" />
</template>
