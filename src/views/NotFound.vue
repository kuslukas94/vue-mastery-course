<script setup>
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  }
})
</script>

<template>
  <h1>This is not the {{ resource }} you are looking for.</h1>
  <img src="/obiwan.jpg" alt="Obi-wan" />
  <div>
    <router-link :to="{ name: 'production-list' }">May the force be with you.</router-link>
  </div>
</template>
