<script setup>
import { ref, onMounted, watch, defineProps } from 'vue'
import ProductionService from '@/services/ProductionService.js'
import EditButton from '@/components/EditButton.vue'
import DeleteButton from '@/components/DeleteButton.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const production = ref(null)

const loadProductionData = async (id) => {
  try {
    const data = await ProductionService.getProductionById(id)
    if (data) {
      production.value = data
    }
  } catch (error) {
    console.error('Error loading production data:', error)
  }
}

onMounted(() => {
  loadProductionData(props.id)
})

watch(
  () => props.id,
  (newId) => {
    if (newId) {
      loadProductionData(newId)
    }
  }
)
</script>

<template>
  <div class="layout" v-if="production">
    <div class="button-container">
      <EditButton />
      <DeleteButton :id="props.id" />
    </div>
    <h1>{{ production.title }}</h1>
    <p><b>Category:</b> {{ production.category }}</p>
    <p><b>Duration:</b> {{ production.duration }} min</p>
    <p><b>Location:</b> {{ production.location }}</p>
    <p><b>Cast:</b></p>
    <div v-for="(actor, index) in production.cast" :key="index">
      <p><b>{{ actor.role }}:</b> {{ actor.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables';
@import '../../styles/mixins';

.layout {
  background-color: $main-background-color;
  padding-top: 1rem;
  padding-bottom: 2rem;
  width: 98vw;
  @include border-card;
}
.button-container {
  position: relative;
  display: flex;
  justify-content: end;
  align-items: end;
  top: 53px;
  right: 5rem;
  gap: 20px;
}
</style>
