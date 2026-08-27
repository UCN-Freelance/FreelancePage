<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    items: string[]
    accent?: string
  }>(),
  { accent: 'var(--accent)' },
)
</script>

<template>
  <article class="service-card" :style="{ '--card-accent': accent }">
    <span class="accent-bar" aria-hidden="true" />

    <div class="card-content">
      <h3>
        {{ title }}
      </h3>

      <p>
        {{ description }}
      </p>
    </div>

    <div class="service-items">
      <span
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.service-card {
  position: relative;

  padding: 30px 26px 26px;

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

  transform: scaleX(0.16);
  transform-origin: left;

  transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* The lift + scale live on .services-grid in ServicesGrid.vue — the reveal
   system outranks a plain .service-card:hover on transform, so they have to
   be written from the grid to take effect. */
.service-card:hover {
  border-color: var(--card-accent);
  box-shadow: 0 18px 34px -18px rgba(15, 23, 42, 0.26);
}

.service-card:hover .accent-bar {
  transform: scaleX(1);
}

.card-content h3 {
  margin: 0;

  color: var(--ink);

  font-size: 22px;
  font-weight: 700;

  line-height: 1.15;
  letter-spacing: -0.02em;

  transition: color 220ms ease;
}

.service-card:hover .card-content h3 {
  color: var(--card-accent);
}

.card-content p {
  max-width: 540px;

  margin: 12px 0 0;

  color: var(--slate);

  font-size: 15px;
  line-height: 1.6;
}

.service-items {
  margin-top: 22px;

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

.service-card:hover .service-items span {
  border-color: var(--card-accent);
}

@media (max-width: 750px) {
  .service-card {
    padding: 22px 24px;
  }

  .card-content h3 {
    font-size: 24px;
  }

  .card-content p {
    font-size: 14px;
  }

  .service-items {
    margin-top: 22px;
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: 20px;
  }

  .card-content h3 {
    font-size: 23px;
  }

  .service-items {
    margin-top: 20px;
  }
}
</style>