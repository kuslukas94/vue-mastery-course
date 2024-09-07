<script setup>
import { toRefs } from 'vue'
import CastManager from './CastManager.vue';

const props = defineProps({
  productions: Object,
  onSubmit: Function
})
const { productions, onSubmit } = toRefs(props)
</script>

<template>
  <form class="myForm" @submit.prevent="onSubmit" autocomplete="off">
    <h3>PRODUCTION DETAILS:</h3>
    <input v-model="productions.title" id="title" placeholder="TITLE" aria-label="Title" />
    <input
      v-model="productions.category"
      id="category"
      placeholder="AGE CATEGORY"
      aria-label="Category"
    />
    <input
      v-model.number="productions.duration"
      id="duration"
      placeholder="DURATION IN MINS"
      aria-label="Duration"
    />
    <select v-model="productions.location" id="location" aria-label="Location">
      <option disabled value="">CHOOSE LOCATION</option>
      <option>Big scene</option>
      <option>Small scene</option>
      <option>Ship</option>
    </select>
    <!-- CAST -->
    <CastManager :productions="productions" />
    
    <!-- SUBMIT FORM-->
    <input type="submit" class="submit-button" value="SUBMIT" />
  </form>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';
@import '../styles/_animations.scss';

.myForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 2rem;
  width: 50vw;
  max-width: 600px;
  background-color: $accent;
  border-radius: 10px;
  border: 1px solid $primary;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
  font-weight: 500;
}

input,
select {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 400px;
  height: 2rem;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ccc;
}

select {
  height: 2.5rem;
}

.submit-button {
  margin-top: 1rem;
  border-radius: 5px;
  border: 1px solid #788b7f;
  font-size: 14px;
  font-weight: 600;
  background-color: $submit-button-background;
  cursor: pointer;
  width: 100%;
  height: 2.5rem;
}

.submit-button:hover {
  background-color: $accent-color;
  color: $main-background-color;
  border-color: $primary;
}
</style>
