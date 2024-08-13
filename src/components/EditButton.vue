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
  <router-link :to="{ name: 'production-edit', params: { id } }">🛠️</router-link>
</template>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

a {
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  cursor: default;
  background-color: #efefef;
  border-radius: 25%;
  border: 1px solid $button-color;
  height: 30px;
  width: 30px;
}
a:hover {
  background-color: $accent-color;
  border-color: $button-hover-color;
}
</style>
