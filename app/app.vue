<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCanUse3D } from '~/composables/useCanUse3D'

const use3D = ref(false)

onMounted(() => {
  // Gates the scroll-reveal CSS in main.css: without JS the items must
  // stay visible rather than sitting at opacity 0 forever.
  document.documentElement.classList.add('js')

  use3D.value = useCanUse3D()
})
</script>

<template>
  <div>
    <!-- mounted once here (not per-page) so the 3D context persists
         across route changes instead of being torn down and rebuilt -->
    <AmbientScene v-if="use3D" />

    <AppHeader />

    <NuxtPage />
  </div>
</template>
