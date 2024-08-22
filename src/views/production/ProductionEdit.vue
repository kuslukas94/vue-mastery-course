<script setup>
import { useRouter } from 'vue-router'
import { reactive, onMounted, inject } from 'vue'
import FormCard from '@/components/FormCard.vue'
import ProductionService from '@/services/productionService.js'
import NotificationComponent from '@/components/NotificationComponent.vue'

const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const productions = reactive({
  title: '',
  category: '',
  duration: '',
  location: 'Big scene', // Default value for select
  cast: ''
})
const GStore = inject('GStore')

const loadProductionData = async () => {
  try {
    const data = await ProductionService.getProductionById(props.id)
    Object.assign(productions, data)
  } catch (error) {
    console.error('Failed to load production data:', error)
  }
}

onMounted(() => {
  loadProductionData()
})

const saveChanges = async () => {
  try {
    if (productions.id) {
      await ProductionService.saveData({ ...productions, id: props.id })
    } else {
      console.error('Production does not have a valid ID')
    }
    GStore.flashMessage = 'Data edited successfully'
    setTimeout(() => {
      router.replace({
        name: 'production-details',
        params: { id: props.id }
      })
      GStore.flashMessage = ''
    }, 1500)
  } catch (err) {
    console.error('Error', err)
    GStore.flashMessage = 'Error saving changes'
  }
}
</script>

<template>
  <NotificationComponent v-if="GStore.flashMessage" />
  <div class="title">
    <h1>Edit Production Details</h1>
  </div>
  <FormCard :productions="productions" :onSubmit="saveChanges" />
</template>
