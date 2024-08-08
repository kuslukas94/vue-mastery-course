<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const saveChanges = () => {
  //If Save Changes API call is successful
  router.replace({
    name: 'production-details',
    id: props.id
  })
}
</script>

<template>
  <div>
    <h1>Edit Production Details</h1>
    <button @click="saveChanges">Save Changes</button>
  </div>
</template>

<style lang="css" scoped>
div {
  height: 50vh;
  width: 96vw;
}
h1 {
  color: black;
}
</style>
