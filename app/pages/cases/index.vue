<script setup lang="ts">
import { ref } from 'vue'
import { useStairReveal } from '~/composables/useStairReveal'
import { caseStudies } from '~/data/cases'

const accentColors = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3']

const gridEl = ref<HTMLElement | null>(null)

useStairReveal(gridEl, '.case-card', {
  direction: (i) => (i % 2 === 0 ? 'left' : 'right'),
})
</script>

<template>
  <main class="cases-page">
    <section class="cases-hero">
      <div class="cases-container">
        <h1>
          Den slags løsninger
          <span>vi bygger.</span>
        </h1>

        <p class="hero-description">
          Gennemarbejdede eksempler frem for en kundeliste — vi er et nyt
          hold, og det lægger vi ikke skjul på. Hver case viser, hvad
          kunden står med, hvad vi ville bygge, og hvad det flytter.
          Klik for at læse mere.
        </p>
      </div>
    </section>

    <section class="cases-section">
      <div class="section-box">
        <div ref="gridEl" class="cases-grid">
          <CaseCard
            v-for="(caseItem, index) in caseStudies"
            :key="caseItem.slug"
            :to="`/cases/${caseItem.slug}`"
            :title="caseItem.title"
            :sector="caseItem.sector"
            :description="caseItem.description"
            :result="caseItem.result"
            :stack="caseItem.stack"
            :accent="accentColors[index % accentColors.length]"
          />
        </div>
      </div>
    </section>

    <ContactCta
      label="Har I et projekt?"
      heading="Jeres projekt kunne"
      heading-accent="stå her næste gang."
      body="Fortæl os kort, hvad I gerne vil have bygget, så vender vi tilbage med et bud på, hvordan vi griber det an."
      cta="Kontakt os"
    />
  </main>
</template>

<style scoped>
.cases-page {
  min-height: 100vh;

  color: var(--ink);
}

.cases-container {
  width: min(1360px, calc(100% - 56px));

  margin: 0 auto;
}

/* =========================
   HERO
   ========================= */

.cases-hero {
  padding: 84px 0 44px;
}

.cases-hero h1 {
  margin: 0;

  max-width: 760px;

  color: var(--ink);

  font-size: clamp(46px, 6vw, 76px);
  font-weight: 700;

  line-height: 0.98;
  letter-spacing: -0.03em;
}

.cases-hero h1 span {
  display: block;

  color: var(--accent);
}

.hero-description {
  max-width: 620px;

  margin: 28px 0 0;

  color: var(--ink-soft);

  font-size: 17px;
  line-height: 1.7;
}

/* =========================
   GRID
   ========================= */

/* The panel itself is .section-box in main.css; this only spaces it. */
.cases-section {
  padding: 8px 0 40px;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 22px;
}

/* Written from the grid, not from .case-card:hover in CaseCard.vue: the
   reveal's `html.js .reveal-item.is-visible { transform: none }` scores
   (0,3,1) and outranks a scoped .case-card:hover at (0,3,0), so the lift
   there never actually applied. From here it wins at (0,5,0). */
.cases-grid .case-card.is-visible:hover {
  z-index: 2;

  transform: translateY(-6px);
}

.cases-grid .case-card.is-visible {
  transition:
    transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 240ms ease,
    border-color 240ms ease;
}

@media (max-width: 1050px) {
  .cases-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 750px) {
  .cases-container {
    width: calc(100% - 32px);
  }

  .cases-hero {
    padding: 56px 0 28px;
  }

  .cases-hero h1 {
    font-size: clamp(40px, 12vw, 58px);
  }

  .hero-description {
    font-size: 15px;
  }

  .cases-section {
    padding: 4px 0 28px;
  }

  .cases-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
}
</style>
