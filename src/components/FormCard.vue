<script setup>
import { ref } from 'vue' // TODO: use reactive instead of ref
import ProductionService from '@/services/ProductionService.js'
import myUUID from '../stores/UUID'

const productions = ref([
  {
    id: myUUID(),
    title: '',
    category: '',
    duration: '',
    location: 'Big scene', // Default value for select
    cast: ''
  }
])
const onSubmit = (event) => {
  const productionToSend = productions.value[0]
  ProductionService.saveData({ productions: [productionToSend] })
    .then((response) => {
      console.log('Response:', response)
    })
    .then(alert('Production was saved.'))
    .catch((err) => {
      console.log('Error:', err)
    })
  event.target.reset()
}
</script>

<template>
  <form class="myForm" @submit.prevent="onSubmit">
    <h3>PRODUCTION DETAILS:</h3>
    <input v-model.lazy="productions[0].title" id="title" placeholder="TITLE" />
    <br />
    <input v-model.lazy="productions[0].category" id="category" placeholder="CATEGORY" />
    <br />
    <input
      v-model.lazy.number="productions[0].duration"
      id="duration"
      placeholder="DURATION IN MINS"
    />
    <br />
    <select v-model.lazy="productions[0].location" id="location">
      <option disabled value="">CHOOSE LOCATION</option>
      <option>Big scene</option>
      <option>Small scene</option>
      <option>Ship</option>
    </select>
    <br />
    <input v-model.lazy="productions[0].cast" id="cast" placeholder="CAST" />
    <br />
    <input type="submit" class="button" value="SUBMIT" />
  </form>
</template>

<style scoped>
.myForm {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 10rem;
  padding: 0 0 5rem 0;
  justify-content: center;
  align-items: center;
  background-color: #a37596;
  border-radius: 15px;
  border: 1px solid rgba(128, 128, 128, 0.605);
  box-shadow: 1px 5px 10px 1px;
  font-weight: 500;
}
input,
select {
  margin-top: 10px;
  margin-bottom: -10px;
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
  background-color: #abc7b6;
  cursor: pointer;
  width: 13rem;
  height: 2rem;
}
.button:hover {
  background-color: #92a7b6;
  color: #f4e6ee;
}
</style>
<!-- --text: #150e12;
--background: #faf7f9;
--primary: #a37596;
--secondary: #abc7b6;
--accent: #92a7b6; -->
