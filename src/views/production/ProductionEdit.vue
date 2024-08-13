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
  id: '',
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
    const response = await ProductionService.saveData({ ...productions })
    console.log('Response', response)
    GStore.flashMessage = 'Data edited successfully'
    setTimeout(() => {
      router.replace({
        name: 'production-details',
        id: props.id
      })
      GStore.flashMessage = ''
    }, 1500)
  } catch (err) {
    console.log('Error', err)
  }
}
</script>

<template>
  <NotificationComponent v-if="GStore.flashMessage" />
  <div class="title">
    <h1>Edit Production Details</h1>
    <FormCard :productions="productions" :onSubmit="saveChanges" />
  </div>
</template>
