<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <button @click="goBack" class="button-nav" title="Back">↩︎</button>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';

.button-nav {
  @include my-buttons;
}
.button-nav:hover {
  @include my-buttons-hover;
}
</style>