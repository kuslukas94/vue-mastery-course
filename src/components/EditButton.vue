<script setup>
import { RouterLink } from 'vue-router'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<template>
  <router-link :to="{ name: 'production-edit', params: { id } }" class="edit-button" title="Edit"
    >🛠️</router-link
  >
</template>

<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/_mixins.scss';

.edit-button {
  @include my-buttons;
}
a:hover {
  @include my-buttons-hover;
}
</style>
