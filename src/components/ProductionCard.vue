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
      <div>category: {{ production.category }}</div>
      <div>duration: {{ production.duration }} min</div>
      <div>scene: {{ production.location }}</div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';

.production-link {
  text-decoration: none;
}
.production-card h2 {
  width: 40%;
}
.production-card div {
  width: 20%;
}
.production-card {
  padding: 0 20px 0 20px;
  width: 80vw;
  cursor: pointer;
  @include border-card;
  background-color: $background;
  color: $text;
  display: flex;
  align-items: center;
}
.production-card:hover {
  transform: scale(1.02);
  transition: 500ms;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: $accent;
}
</style>
