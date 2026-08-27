<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    title: string
    description: string
    items: string[]
    accent?: string
  }>(),
  { accent: 'var(--accent)' },
)

// Collapsed by default: the grid's job at rest is to let you scan eight
// service names, not read eight paragraphs. The detail is one click away
// and every card can be open at once — they're independent, so opening
// one is no reason to close another.
const open = ref(false)
</script>

<template>
  <article class="service-card" :class="{ 'is-open': open }" :style="{ '--card-accent': accent }">
    <span class="accent-bar" aria-hidden="true" />

    <!-- The header is the control, so the whole top of the card is a hit
         target rather than just the chevron in its corner. -->
    <button
      type="button"
      class="card-toggle"
      :aria-expanded="open"
      @click="open = !open"
    >
      <h3>{{ title }}</h3>

      <span class="toggle-icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none">
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <span class="sr-only">{{ open ? 'Skjul detaljer' : 'Vis detaljer' }} om {{ title }}</span>
    </button>

    <!-- 0fr -> 1fr is what makes this animate to the content's own
         height; a max-height guess would either clip the tall cards or
         make the short ones drift open slowly. -->
    <div class="card-detail">
      <div class="detail-inner">
        <p>{{ description }}</p>

        <div class="service-items">
          <span v-for="item in items" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.service-card {
  position: relative;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid var(--line);
  border-radius: var(--radius-md);

  /* Set (with the rest of the hover tuning) on .services-grid in
     ServicesGrid.vue; the fallback keeps a standalone card usable. */
  background: var(--card-surface, #ffffff);

  /* Tight contact edge plus a soft ambient spread, so the card reads as
     lifted off --card-canvas rather than painted onto it. */
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.06),
    0 6px 16px -8px rgba(15, 23, 42, 0.14);

  transition:
    opacity var(--card-hover-ms, 240ms) ease,
    transform var(--card-hover-ms, 240ms) cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow var(--card-hover-ms, 240ms) ease,
    border-color var(--card-hover-ms, 240ms) ease;
}

.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;

  background: var(--card-accent);

  /* Part-width at rest, full-width when the card is open or hovered —
     the bar doubles as the "this one is expanded" marker. */
  transform: scaleX(0.16);
  transform-origin: left;

  transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card:hover .accent-bar,
.service-card.is-open .accent-bar {
  transform: scaleX(1);
}

/* The lift + scale live on .services-grid in ServicesGrid.vue — the reveal
   system outranks a plain .service-card:hover on transform, so they have to
   be written from the grid to take effect. */
.service-card:hover {
  border-color: var(--card-accent);
  box-shadow: 0 18px 34px -18px rgba(15, 23, 42, 0.26);
}

.service-card.is-open {
  border-color: var(--card-accent);
}

/* =========================
   TOGGLE
   ========================= */

.card-toggle {
  width: 100%;

  padding: 24px 22px;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 14px;

  border: 0;

  background: transparent;

  text-align: left;

  /* The pointer is the main signal that these open, since a card that
     looks clickable but isn't was the previous problem. */
  cursor: pointer;

  font: inherit;
  color: inherit;
}

.card-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -3px;

  border-radius: var(--radius-md);
}

.card-toggle h3 {
  margin: 0;

  color: var(--ink);

  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;

  line-height: 1.2;
  letter-spacing: -0.02em;

  transition: color 220ms ease;
}

.service-card:hover .card-toggle h3,
.service-card.is-open .card-toggle h3 {
  color: var(--card-accent);
}

/* A filled chip rather than a bare glyph: at 26px a lone chevron on a
   white card is easy to miss, and this is the affordance. */
.toggle-icon {
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--bg-raised);
  color: var(--ink-soft);

  transition:
    transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
    background 220ms ease,
    color 220ms ease;
}

.toggle-icon svg {
  width: 17px;
  height: 17px;
}

.service-card:hover .toggle-icon {
  background: var(--card-accent);
  color: #ffffff;
}

.service-card.is-open .toggle-icon {
  transform: rotate(180deg);

  background: var(--card-accent);
  color: #ffffff;
}

/* =========================
   DETAIL
   ========================= */

.card-detail {
  display: grid;
  grid-template-rows: 0fr;

  transition: grid-template-rows 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card.is-open .card-detail {
  grid-template-rows: 1fr;
}

/* The row collapses to zero height, so the child has to be the thing
   that hides its own overflow. `min-height: 0` is load-bearing: a grid
   item's automatic minimum size is its content, which would stop the
   0fr track from ever reaching zero. */
.detail-inner {
  min-height: 0;

  overflow: hidden;

  opacity: 0;

  transition: opacity 220ms ease;
}

.service-card.is-open .detail-inner {
  opacity: 1;

  transition: opacity 260ms ease 80ms;
}

.detail-inner p {
  margin: 0;
  padding: 0 22px;

  color: var(--slate);

  font-size: 15px;
  line-height: 1.6;
}

.service-items {
  margin: 0;
  padding: 18px 22px 24px;

  display: flex;
  flex-wrap: wrap;

  gap: 6px;
}

.service-items span {
  padding: 5px 9px;

  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);

  background: transparent;

  color: var(--ink-soft);

  font-family: var(--font-mono);
  font-size: 13px;

  transition: border-color 220ms ease;
}

.service-card:hover .service-items span,
.service-card.is-open .service-items span {
  border-color: var(--card-accent);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;

  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-width: 750px) {
  .card-toggle {
    padding: 20px;
  }

  .card-toggle h3 {
    font-size: 19px;
  }

  .detail-inner p,
  .service-items {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
