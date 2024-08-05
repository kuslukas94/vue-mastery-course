<script setup>
import { reactive, ref } from 'vue'
import ProductionService from '@/services/productionService.js'
import myUUID from '../stores/UUID'

const initialProductions = () => ({
  id: myUUID(),
  title: '',
  category: '',
  duration: '',
  location: 'Big scene', // Default value for select
  cast: ''
})
const productions = reactive(initialProductions())
//SUBMIT form function
const onSubmit = async () => {
  try {
    const response = await ProductionService.saveData({ ...productions })
    console.log('Response', response)
    turnOnNotification()
    Object.assign(productions, initialProductions())
  } catch (err) {
    console.log('Error', err)
  }
}
//Notification animation function
const disabled = ref(false)
function turnOnNotification() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 2000)
}
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
  <div :class="{ notification: disabled }">
    <div v-if="disabled">Production was saved.</div>
  </div>
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
