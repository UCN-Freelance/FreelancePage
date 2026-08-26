<template>
  <div class="ambient-stage" aria-hidden="true">
    <TresCanvas clear-color="#00000000" :dpr="[1, 1.5]">
      <AmbientContent />
    </TresCanvas>
  </div>
</template>

<style scoped>
.ambient-stage {
  position: fixed;
  inset: 0;
  z-index: -1;

  pointer-events: none;
}

.ambient-stage :deep(canvas) {
  display: block;
}
</style>
