<script>
import axios from 'axios'
import myUUID from '../stores/UUID'

export default {
  data() {
    return {
      productions: [
        {
          id: myUUID(),
          title: '',
          category: '',
          duration: '',
          location: ['Big scene', 'Small scene', 'Ship'],
          cast: ''
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      axios
        .post('https://my-json-server.typicode.com/kuslukas94/vue-mastery-course', this.productions)
        .then((response) => {
          console.log('Response', response)
        })
        .catch((err) => {
          console.log('Error', err)
        })
    }
  }
}
</script>

<template>
  <form class="myForm" @submit.prevent="onSubmit">
    <h3>Production details:</h3>
    <label for="title">Title:</label>
    <input v-model.lazy="productions.title" id="title" />
    <br />
    <label for="category">Category:</label>
    <input v-model.lazy="productions.category" id="category" />
    <br />
    <label for="duration">Duration:</label>
    <input v-model.lazy.number="productions.duration" id="duration" placeholder="in minutes" />
    <br />
    <label for="location">Location:</label>
    <select v-model.lazy="productions.location" id="location">
      <option disabled value="Choose scene">Choose scene</option>
      <option>Big scene</option>
      <option>Small scene</option>
      <option>Ship</option>
    </select>
    <br />
    <label for="cast">Cast:</label>
    <input v-model.lazy="productions.cast" id="cast" />
    <br />
    <input type="submit" class="button" value="Submit" />
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
  background-color: rgb(145, 167, 199);
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
}
.button {
  border-radius: 15px;
  border: 1px solid rgb(123, 123, 133);
  box-shadow: 1px 1px 2px 0.5px;
  font-size: medium;
  background-color: rgb(102, 195, 211);
  cursor: pointer;
}
.button:hover {
  background-color: rgb(66, 212, 166);
}
</style>
