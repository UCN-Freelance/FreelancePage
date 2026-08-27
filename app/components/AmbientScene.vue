<template>
  <div class="ambient-stage" aria-hidden="true">
    <!-- `alpha` and `clear-alpha` have to be set explicitly. The 8-digit
         "#00000000" this used to rely on is not read as an alpha channel —
         three.js parses it as opaque black, so the canvas painted a solid
         black sheet over every section that doesn't paint its own
         background (the hero, most obviously). -->
    <TresCanvas
      :alpha="true"
      clear-color="#000000"
      :clear-alpha="0"
      :dpr="[1, 1.5]"
    >
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
