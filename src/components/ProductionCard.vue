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
      <span>{{ production.category }} , Duration: {{ production.duration }} min</span><br /> <!-- br -->
      <span>{{ production.location }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.production-link {
  color: #150e12;
  text-decoration: none;
}
.production-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #abc7b6;
  border-radius: 25px;
  margin-bottom: 18px;
  background-color: #a37596;
  color: #150e12;
}
.production-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #92a7b6;
}
</style>
<!-- --text: #150e12;
--background: #faf7f9;
--primary: #a37596;
--secondary: #abc7b6;
--accent: #92a7b6; -->
