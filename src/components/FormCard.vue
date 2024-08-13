<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  productions: Object,
  onSubmit: Function
})
const { productions, onSubmit } = toRefs(props)
</script>

<template>
  <form class="myForm" @submit.prevent="onSubmit" autocomplete="off">
    <h3>PRODUCTION DETAILS:</h3>
    <input v-model="productions.title" id="title" placeholder="TITLE" />
    <input v-model="productions.category" id="category" placeholder="CATEGORY" />
    <input v-model.number="productions.duration" id="duration" placeholder="DURATION IN MINS" />
    <select v-model="productions.location" id="location">
      <option disabled value="">CHOOSE LOCATION</option>
      <option>Big scene</option>
      <option>Small scene</option>
      <option>Ship</option>
    </select>
    <input v-model="productions.cast" id="cast" placeholder="CAST" />
    <input type="submit" class="button" value="SUBMIT" />
  </form>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';
@import '../styles/_animations.scss';

.myForm {
  display: flex;
  flex-direction: column;
  margin: 0 10rem;
  padding: 0 0 5rem 0;
  width: 55vw;
  height: auto;
  justify-content: center;
  align-items: center;
  background-color: $main-background-color;
  border-radius: 15px;
  border: 1px solid rgba(128, 128, 128, 0.605);
  box-shadow: 1px 5px 10px 1px;
  font-weight: 500;
}
input,
select {
  margin-top: 10px;
  margin-bottom: 5px;
  width: 13rem;
  height: 1.5rem;
  text-align: center;
  border-radius: 7px;
  border: 1px solid white;
}
select {
  width: 13.4rem;
  height: 1.8rem;
}
.button {
  border-radius: 7px;
  border: 1px solid #788b7f;
  font-size: 14px;
  font-weight: 600;
  background-color: $button-color;
  cursor: pointer;
  width: 13rem;
  height: 2rem;
}
.button:hover {
  background-color: $accent-color;
  color: $button-hover-color;
}
</style>
