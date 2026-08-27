<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Gates the scroll-reveal CSS in main.css: without JS the items must
  // stay visible rather than sitting at opacity 0 forever.
  document.documentElement.classList.add('js')
})
</script>

<template>
  <div>
    <AppHeader />

    <NuxtPage />
  </div>
</template>
