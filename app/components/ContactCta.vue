<script setup lang="ts">
/**
 * The contact hook that closes every page. Same shape everywhere so it
 * reads as the site's one standing invitation rather than four different
 * pitches; only the wording changes per page.
 *
 * It is deliberately the single accent-filled band on any given page —
 * the last thing you scroll past, and the only surface that isn't
 * white-on-grey, so the eye lands on it.
 */
withDefaults(
  defineProps<{
    label?: string
    heading?: string
    headingAccent?: string
    body?: string
    cta?: string
  }>(),
  {
    label: 'Næste skridt',
    heading: 'Lad os bygge',
    headingAccent: 'noget godt sammen.',
    body: 'Fortæl os kort om projektet, så finder vi ud af, hvordan vi bedst kan hjælpe.',
    cta: 'Kontakt os',
  },
)
</script>

<template>
  <section class="contact-cta">
    <div class="section-box is-accent cta-container">
      <div class="cta-copy">
        <span class="cta-label">{{ label }}</span>

        <h2>
          {{ heading }}
          <strong>{{ headingAccent }}</strong>
        </h2>

        <p>{{ body }}</p>
      </div>

      <NuxtLink to="/contact" class="cta-button">
        <span>{{ cta }}</span>

        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 12h12M13 7l5 5-5 5"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* The panel is .section-box.is-accent (main.css) — the same inset,
   rounded box the grids use, filled with the accent instead of the grey.
   It stays in step with them rather than being the one thing still
   bleeding to the page edges. */
.contact-cta {
  padding: 8px 0 56px;
}

.cta-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 48px;
}

.cta-copy {
  max-width: 620px;
}

.cta-label {
  display: block;

  margin-bottom: 18px;

  /* Reads on the indigo fill without going to pure white, which would
     compete with the heading sitting right under it. */
  color: rgba(255, 255, 255, 0.75);

  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.cta-copy h2 {
  margin: 0;

  color: #ffffff;

  font-size: clamp(34px, 4vw, 52px);
  font-weight: 700;

  line-height: 1.04;
  letter-spacing: -0.02em;
}

.cta-copy h2 strong {
  display: block;

  color: rgba(255, 255, 255, 0.72);

  font-weight: 700;
}

.cta-copy p {
  max-width: 520px;

  margin: 22px 0 0;

  color: rgba(255, 255, 255, 0.88);

  font-size: 16px;
  line-height: 1.7;
}

/* White on indigo: the highest-contrast pairing available here, so the
   one action on the band is unmistakably the thing to click. */
.cta-button {
  height: 56px;

  flex-shrink: 0;

  padding: 0 26px;

  display: inline-flex;
  align-items: center;

  gap: 12px;

  border-radius: var(--radius-md);

  background: #ffffff;
  color: var(--accent);

  font-size: 16px;
  font-weight: 700;

  text-decoration: none;

  box-shadow: 0 10px 26px -12px rgba(15, 23, 42, 0.55);

  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.cta-button svg {
  width: 21px;
  height: 21px;

  transition: transform 180ms ease;
}

.cta-button:hover {
  transform: translateY(-2px);

  background: #f8fafc;

  box-shadow: 0 16px 34px -14px rgba(15, 23, 42, 0.6);
}

.cta-button:hover svg {
  transform: translateX(4px);
}

@media (max-width: 850px) {
  .contact-cta {
    padding: 4px 0 32px;
  }

  .cta-container {
    display: block;
  }

  .cta-copy h2 {
    font-size: clamp(30px, 8vw, 42px);
  }

  .cta-button {
    width: 100%;

    margin-top: 32px;

    justify-content: center;
  }
}
</style>
