<script setup lang="ts">
import { caseStudies } from '~/data/cases'

const accentColors = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3']
</script>

<template>
  <main class="cases-page">
    <section class="cases-hero">
      <!-- .is-plain (main.css): opaque, so the copy is not read through
           the staircase pattern behind it. -->
      <div class="section-box is-plain hero-box">
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
        <div class="cases-grid">
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
  padding: 40px 0 20px;
}

.hero-box {
  padding-top: 56px;
  padding-bottom: 56px;
}

.hero-box h1 {
  margin: 0;

  max-width: 760px;

  color: var(--ink);

  font-size: clamp(46px, 6vw, 76px);
  font-weight: 700;

  line-height: 0.98;
  letter-spacing: -0.03em;
}

.hero-box h1 span {
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

/* Still written from the grid rather than CaseCard.vue's own
   .case-card:hover — the scoped rule there sets border and shadow, and
   keeping the transform here means the lift and those stay in one place.
   The .is-visible qualifier these used to carry existed only to outrank
   the scroll-reveal's entrance transform, which no longer exists. */
.cases-grid .case-card:hover {
  z-index: 2;

  transform: translateY(-6px);
}

.cases-grid .case-card {
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
    padding: 20px 0 12px;
  }

  .hero-box {
    padding-top: 34px;
    padding-bottom: 34px;
  }

  .hero-box h1 {
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
