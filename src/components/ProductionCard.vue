<script setup>
defineProps({
  production: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink
    class="production-link"
    :to="{ name: 'production-details', params: { id: production.id } }"
  >
    <div class="production-card">
      <h2>{{ production.title }}</h2>
      <span>@{{ production.time }} on {{ production.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.production-link {
  color: #2c3e50;
  text-decoration: none;
}
.production-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.production-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
