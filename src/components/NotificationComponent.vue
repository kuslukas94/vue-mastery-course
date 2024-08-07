<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div :class="{ notification: isVisible }">
    <div v-if="isVisible">Production was saved.</div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins';
@import '../styles/animations';

.notification {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -25rem;
  left: 50%;
  transform: translateX(-50%);
  height: 200px;
  width: 400px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  background-color: #788b7f;
  @include border-card;
  animation: notification-animation 3s ease-out;
}
</style>
