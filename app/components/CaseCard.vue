<script setup lang="ts">
import { ref, onMounted } from 'vue'

withDefaults(
  defineProps<{
    title: string
    sector: string
    description: string
    result: string
    to: string
    stack: string[]
    // Optional: drop a photo into public/cases/ and pass its path. Until
    // one exists the accent panel below stands in, so nothing requests
    // an image that is not there.
    image?: string
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
  <NuxtLink class="case-card" :to="to" :style="{ '--card-accent': accent }">
    <div class="case-image-wrapper">
      <img
        v-if="image && !imageFailed"
        ref="imageEl"
        :src="image"
        :alt="title"
        class="case-image"
        @error="imageFailed = true"
      />

      <!-- Shown until a real photo is dropped into public/cases/. Built
           from the card's own accent rather than grey, so a case without
           artwork still reads as finished rather than as a broken image. -->
      <div v-else class="case-placeholder">
        <span class="placeholder-sector">{{ sector }}</span>
      </div>
    </div>

    <div class="case-content">
      <h2>{{ title }}</h2>

      <p>{{ description }}</p>

      <div class="case-result">
        <span class="result-tick" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8.5l3 3 6-7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        {{ result }}
      </div>

      <div class="case-stack">
        <span v-for="tech in stack" :key="tech">{{ tech }}</span>
      </div>

      <span class="case-more">
        Læs mere

        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5 10h10M11 6l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* The whole card is the link to its detail page, so the target is the
   card rather than a caption inside it. */
.case-card {
  display: flex;
  flex-direction: column;

  color: inherit;
  text-decoration: none;

  overflow: hidden;

  border: 1px solid var(--line);
  border-radius: var(--radius-md);

  background: var(--card-surface);

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.06),
    0 6px 16px -8px rgba(15, 23, 42, 0.14);

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
  aspect-ratio: 16 / 9;

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
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-end;

  padding: 18px 20px;

  /* The accent, deepened toward ink at the far corner so the sector label
     stays legible wherever it sits. The flat accent is declared first as a
     fallback: without it, a browser that cannot parse color-mix drops the
     whole gradient and leaves white text on nothing. */
  background: var(--card-accent);
  background:
    linear-gradient(
      135deg,
      var(--card-accent) 0%,
      color-mix(in srgb, var(--card-accent) 55%, #1e293b) 100%
    );

  overflow: hidden;
}

/* Faint isometric ruling — enough texture that the panel doesn't read as
   a flat colour swatch, faint enough not to fight the label. */
.case-placeholder::before {
  content: '';

  position: absolute;
  inset: 0;

  background:
    repeating-linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.14),
      rgba(255, 255, 255, 0.14) 1px,
      transparent 1px,
      transparent 14px
    );
}

.placeholder-sector {
  position: relative;

  padding: 6px 12px;

  border-radius: var(--radius-sm);

  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;

  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;

  letter-spacing: 0.04em;

  backdrop-filter: blur(4px);
}

.case-content {
  display: flex;
  flex-direction: column;

  flex: 1;

  padding: 22px 24px 24px;
}

.case-content h2 {
  margin: 0;

  color: var(--ink);

  font-size: 21px;
  font-weight: 700;

  line-height: 1.2;
  letter-spacing: -0.01em;

  transition: color 220ms ease;
}

.case-card:hover .case-content h2 {
  color: var(--card-accent);
}

.case-content p {
  margin: 11px 0 0;

  color: var(--slate);

  font-size: 15px;
  line-height: 1.6;
}

/* The one number worth taking away from the card, so it gets the accent
   and a rule above it rather than sitting inside the paragraph. */
.case-result {
  margin-top: auto;
  padding-top: 18px;

  display: flex;
  align-items: center;

  gap: 9px;

  color: var(--card-accent);

  font-size: 15px;
  font-weight: 600;
}

.result-tick {
  width: 20px;
  height: 20px;

  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  /* Same reasoning as the placeholder gradient: a plain tint first, so the
     tick still sits on a disc where color-mix is unavailable. */
  background: var(--bg-raised);
  background: color-mix(in srgb, var(--card-accent) 14%, transparent);
}

.result-tick svg {
  width: 13px;
  height: 13px;
}

.case-stack {
  margin-top: 16px;
  padding-top: 16px;

  display: flex;
  flex-wrap: wrap;

  gap: 6px;

  border-top: 1px solid var(--line);
}

.case-stack span {
  padding: 4px 9px;

  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);

  color: var(--ink-soft);

  font-family: var(--font-mono);
  font-size: 12px;

  transition: border-color 220ms ease;
}

.case-card:hover .case-stack span {
  border-color: var(--card-accent);
}

.case-more {
  margin-top: 16px;

  display: inline-flex;
  align-items: center;

  gap: 8px;

  color: var(--card-accent);

  font-size: 14px;
  font-weight: 600;
}

.case-more svg {
  width: 16px;
  height: 16px;

  transition: transform 180ms ease;
}

.case-card:hover .case-more svg {
  transform: translateX(4px);
}

@media (max-width: 600px) {
  .case-content {
    padding: 20px 21px 22px;
  }

  .case-content h2 {
    font-size: 20px;
  }
}
</style>
