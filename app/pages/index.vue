<script setup lang="ts">
import { ref } from 'vue'
import { useStairReveal } from '~/composables/useStairReveal'

// The landing page's whole job is to point at the other three pages, so
// the sections below are a directory rather than a pitch: one line each,
// then a link. Anything that wants more room belongs on its own page.
const destinations = [
  {
    to: '/services',
    label: 'Ydelser',
    title: 'Det vi bygger',
    description:
      'Web, apps, automatisering, integrationer og backend — otte discipliner, samlet ét sted.',
    cta: 'Se ydelser',
  },
  {
    to: '/cases',
    label: 'Cases',
    title: 'Den slags vi bygger',
    // Deliberately not "projekter vi har bygget for kunder" — the cases
    // are worked examples, not delivered work, and each one says so on
    // its own page. The landing page shouldn't claim otherwise.
    description:
      'Gennemgående eksempler på løsninger, vi kan bygge, med teknologien og resultatet bag hver enkelt.',
    cta: 'Se cases',
  },
  {
    to: '/about',
    label: 'Om os',
    title: 'Holdet bag',
    description:
      'Syv udviklere fra UCN. Du arbejder direkte sammen med dem, der bygger din løsning.',
    cta: 'Mød teamet',
  },
]

const destinationsEl = ref<HTMLElement | null>(null)

useStairReveal(destinationsEl, '.destination-card', {
  direction: (i) => (i === 0 ? 'left' : i === 2 ? 'right' : 'up'),
})
</script>

<template>
  <main>
    <!-- HERO -->
    <section class="hero">
      <!-- .is-plain: an opaque white panel, so the heading and body copy
           don't have to be read through the staircase pattern. -->
      <div class="section-box is-plain hero-box">
        <h1>
          Vi bygger digitale
          <span>løsninger, der virker.</span>
        </h1>

        <p class="hero-description">
          Next Step Freelance er et team af syv udviklere fra UCN, der hjælper
          virksomheder med at udvikle moderne software, webapplikationer og
          digitale produkter.
        </p>

        <div class="hero-actions">
          <NuxtLink to="/contact" class="primary-button">
            <span>Start et projekt</span>

            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 10h10M11 6l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NuxtLink>

          <NuxtLink to="/services" class="secondary-button">
            Se vores ydelser
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- WHERE TO GO NEXT — the three other pages, one card each -->
    <section class="destinations-section">
      <div class="section-box">
        <div ref="destinationsEl" class="destinations-grid">
          <NuxtLink
            v-for="destination in destinations"
            :key="destination.to"
            :to="destination.to"
            class="destination-card"
          >
            <span class="destination-label">{{ destination.label }}</span>

            <h2>{{ destination.title }}</h2>

            <p>{{ destination.description }}</p>

            <span class="destination-cta">
              {{ destination.cta }}

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
          </NuxtLink>
        </div>
      </div>
    </section>

    <ContactCta />
  </main>
</template>

<style scoped>
main {
  color: var(--ink);
}

/* =========================
   HERO
   ========================= */

.hero {
  padding: 40px 0 20px;
}

/* Sizing, colour and radius come from .section-box.is-plain; the hero
   only needs a little more breathing room than a grid panel. */
.hero-box {
  padding-top: 60px;
  padding-bottom: 60px;
}

.hero h1 {
  max-width: 900px;

  margin: 0;

  font-size: clamp(48px, 5.6vw, 78px);
  font-weight: 700;

  line-height: 1;
  letter-spacing: -0.03em;
}

.hero h1 span {
  display: block;

  color: var(--accent);
}

.hero-description {
  max-width: 620px;

  margin: 30px 0 0;

  color: var(--ink-soft);

  font-size: 17px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 12px;

  margin-top: 36px;
}

/* =========================
   BUTTONS

   Both carry a solid fill or a real border rather than sitting as bare
   text on the page — on the #f1f5f9 background a borderless link is
   easy to miss, and these are the page's only two actions.
   ========================= */

.primary-button,
.secondary-button {
  height: 52px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--radius-md);

  font-size: 15px;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 180ms ease,
    color 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.primary-button {
  gap: 10px;

  padding: 0 22px;

  border: 1px solid var(--accent);

  background: var(--accent);
  color: #ffffff;

  box-shadow: 0 6px 18px -8px rgba(99, 102, 241, 0.7);
}

.primary-button svg {
  width: 18px;
  height: 18px;

  transition: transform 180ms ease;
}

.primary-button:hover {
  background: #4f46e5;
  border-color: #4f46e5;

  box-shadow: 0 10px 26px -10px rgba(79, 70, 229, 0.8);
}

.primary-button:hover svg {
  transform: translateX(3px);
}

.secondary-button {
  padding: 0 20px;

  border: 1px solid var(--line-strong);

  background: #ffffff;
  color: var(--ink);
}

.secondary-button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* =========================
   DESTINATIONS

   The three cards sit in the shared .section-box panel (main.css) — a
   shade below --bg, inset from both page edges and rounded, so it reads
   as a box holding them.
   ========================= */

/* The panel itself is .section-box in main.css; this only spaces it. */
.destinations-section {
  padding: 8px 0 40px;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 22px;
}

/* The whole card is the link — a card-sized target is far easier to hit
   than the caption at the bottom of it, which is what the arrow row is
   for visually rather than functionally. */
.destination-card {
  display: flex;
  flex-direction: column;

  padding: 28px 26px 24px;

  border: 1px solid var(--line);
  border-radius: var(--radius-md);

  background: var(--card-surface);
  color: inherit;

  text-decoration: none;

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.06),
    0 6px 16px -8px rgba(15, 23, 42, 0.14);

  transition:
    transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 240ms ease,
    box-shadow 240ms ease;
}

.destination-card:hover {
  transform: translateY(-4px);

  border-color: var(--accent);

  box-shadow: 0 18px 34px -18px rgba(15, 23, 42, 0.26);
}

.destination-label {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.destination-card h2 {
  margin: 14px 0 0;

  font-size: 24px;
  font-weight: 700;

  line-height: 1.2;
  letter-spacing: -0.02em;
}

.destination-card p {
  margin: 12px 0 0;

  color: var(--ink-soft);

  font-size: 15px;
  line-height: 1.65;
}

/* Pushed to the bottom edge so all three read along one line no matter
   how long the description above it runs. */
.destination-cta {
  margin-top: auto;
  padding-top: 22px;

  display: inline-flex;
  align-items: center;

  gap: 8px;

  color: var(--accent);

  font-size: 15px;
  font-weight: 600;
}

.destination-cta svg {
  width: 17px;
  height: 17px;

  transition: transform 180ms ease;
}

.destination-card:hover .destination-cta svg {
  transform: translateX(4px);
}

/* =========================
   TABLET / MOBILE
   ========================= */

@media (max-width: 950px) {
  .destinations-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .hero {
    padding: 20px 0 12px;
  }

  .hero-box {
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .hero h1 {
    font-size: clamp(38px, 11vw, 56px);
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-actions {
    gap: 10px;
  }

  .primary-button,
  .secondary-button {
    flex: 1 1 100%;
  }

  .destinations-section {
    padding: 4px 0 28px;
  }

  .destinations-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
}
</style>
