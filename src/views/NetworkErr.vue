<template>
  <div class="networkError">
    <h1>Oh no!</h1>
    <h3>
      It looks like you're experiencing some network issues, please
      <a href="#" @click="$router.go(-2)">click here</a> to try again.
    </h3>
  </div>
</template>
