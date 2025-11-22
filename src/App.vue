<script setup>
import { RouterView } from 'vue-router'
import AppLayout from './Layout/AppLayout.vue';
</script>

<template>
    <main class="container">
      <AppLayout>
        <RouterView/>
      </AppLayout>
    </main>
</template>

<style scoped>
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
}
</style>