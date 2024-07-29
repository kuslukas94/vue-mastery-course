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
      <div>{{ production.category }} , Duration: {{ production.duration }} min</div>
      <div>{{ production.location }}</div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';

.production-link {
  text-decoration: none;
}
.production-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  @include border-card;
  background-color: $main-background-color;
  color: $main-font-color;
}
.production-card h2 {
  margin-top: 3px;
}
.production-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: $accent-color;
}
</style>
