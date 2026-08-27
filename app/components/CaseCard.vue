<script setup lang="ts">
import { ref, onMounted } from 'vue'

withDefaults(
  defineProps<{
    title: string
    description: string
    image: string
    accent?: string
  }>(),
  { accent: 'var(--accent)' },
)

const imageFailed = ref(false)
const imageEl = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (imageEl.value && imageEl.value.complete && imageEl.value.naturalWidth === 0) {
    imageFailed.value = true
  }
})
</script>

<template>
  <article class="case-card" :style="{ '--card-accent': accent }">
    <div class="case-image-wrapper">
      <img
        v-if="!imageFailed"
        ref="imageEl"
        :src="image"
        :alt="title"
        class="case-image"
        @error="imageFailed = true"
      />

      <div v-else class="case-placeholder" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="4" y="6" width="24" height="20" rx="1" stroke="currentColor" stroke-width="1.4" />
          <circle cx="11" cy="13" r="2" stroke="currentColor" stroke-width="1.4" />
          <path
            d="M6 22l7-6 5 4 4-4 4 5"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="case-content">
      <h2>
        {{ title }}
      </h2>

      <p>
        {{ description }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.case-card {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);

  background: var(--bg);

  transition:
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 260ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 260ms ease;
}

/* The lift lives on .cases-grid in cases.vue — the reveal system outranks
   a plain .case-card:hover on transform, so it has to be written from the
   grid to take effect. */
.case-card:hover {
  border-color: var(--card-accent);
  box-shadow: 0 18px 34px -18px rgba(15, 23, 42, 0.22);
}

.case-image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 10;

  overflow: hidden;

  background: var(--bg-raised);
}

.case-image {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition: transform 400ms ease;
}

.case-card:hover .case-image {
  transform: scale(1.03);
}

.case-placeholder {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    repeating-linear-gradient(
      135deg,
      var(--bg-raised),
      var(--bg-raised) 10px,
      var(--bg) 10px,
      var(--bg) 20px
    );

  color: var(--slate);
}

.case-placeholder svg {
  width: 36px;
  height: 36px;
}

.case-content {
  padding: 24px 26px 28px;
}

.case-content h2 {
  margin: 0;

  color: var(--ink);

  font-size: 22px;
  font-weight: 700;

  line-height: 1.15;
  letter-spacing: -0.01em;

  transition: color 220ms ease;
}

.case-card:hover .case-content h2 {
  color: var(--card-accent);
}

.case-content p {
  margin: 12px 0 0;

  color: var(--slate);

  font-size: 15px;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .case-content {
    padding: 20px 21px 23px;
  }

  .case-content h2 {
    font-size: 20px;
  }
}
</style>
