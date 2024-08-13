<script setup>
import { inject } from 'vue'

const GStore = inject('GStore')
</script>

<template>
  <div class="notification">
    {{ GStore.flashMessage }}
  </div>
</template>

<style lang="scss">
@import '../styles/mixins';
@import '../styles/animations';
@import '../styles/variables';

.notification {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 33%;
  left: 33%;
  transform: translateX(-67%, -67%);
  height: 200px;
  width: 400px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  background-color: $accent-color;
  @include border-card;
  animation: notification-animation 1.5s ease-out;
}
</style>
