<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <header>
      <div class="wrapper">
        <a href="https://divadlo-radost.cz/" target="blank"><img src="/logo.jpg" alt="Logo Divadlo Radost" class="my-logo"></a>
        <nav>
          <RouterLink :to="{ name: 'production-list' }">Repertoir</RouterLink> |
          <RouterLink :to="{ name: 'form' }">Add new</RouterLink> |
          <RouterLink :to="{ name: 'compare' }">Compare playble</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </header>
  </div>
  <RouterView />
</template>
