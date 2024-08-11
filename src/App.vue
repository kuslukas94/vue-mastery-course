<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'production-list' }">Repertoir</RouterLink> |
          <RouterLink :to="{ name: 'form' }">Add new</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </header>
  </div>
  <RouterView />
</template>
