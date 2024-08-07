<script setup>
import { reactive, ref } from 'vue'
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

const onSubmit = async () => {
  try {
    const response = await ProductionService.saveData({ ...productions })
    console.log('Response', response)
    turnOnNotification()
    Object.assign(productions, initialProductions())
  } catch (err) {
    console.log('Error', err)
  }
}

const disabled = ref(false)

function turnOnNotification() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
</script>

<template>
  <FormCard :productions="productions" :onSubmit="onSubmit" />
  <NotificationComponent :isVisible="disabled" />
</template>
