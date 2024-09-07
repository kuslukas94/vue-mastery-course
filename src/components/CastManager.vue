<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  productions: Object
})
const { productions } = toRefs(props)

const addActor = () => {
  productions.value.cast.push({ role: '', name: '' })
}
const removeActor = (index) => {
  productions.value.cast.splice(index, 1)
}
</script>

<template>
  <h4>Cast:</h4>
  <div v-for="(actor, index) in productions.cast" :key="index" class="cast-entry">
    <input type="text" :id="'role-' + index" v-model="actor.role" placeholder="ROLE NAME" aria-label="ActorRole">

    <input type="text" :id="'name-' + index" v-model="actor.name" placeholder="ACTRESS/ACTOR NAME" aria-label="ActorName">
    <!-- BUTTON for removing actor before submit -->
    <button @click.prevent="removeActor(index)" class="delete-button">❌</button>
  </div>
  <!-- ADD Actor-->
  <button @click.prevent="addActor" class="small-button">Add Actor</button>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';

.cast-entry {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
input {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 80%;
  max-width: 180px;
  height: 1.5rem;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.small-button {
  border-radius: 5px;
  border: 1px solid $secondary;
  font-size: 14px;
  background-color: $main-background-color;
  cursor: pointer;
  width: 20%;
  height: 2rem;
}
.small-button:hover {
  background-color: $secondary;
  color: $main-background-color;
}
.delete-button {
  @include my-buttons;
}
.delete-button:hover {
  @include my-buttons-hover;
}
</style>