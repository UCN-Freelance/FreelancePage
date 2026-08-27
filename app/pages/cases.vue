<script setup lang="ts">
import { ref } from 'vue'
import { useStairReveal } from '~/composables/useStairReveal'

// Placeholder portfolio. These are representative of the work described
// on /services rather than real signed engagements — swap them for actual
// projects as they land.
//
// No `image` is set on any of them, so every card falls back to the
// accent panel in CaseCard. To give one a photo, drop the file into
// public/cases/ and add `image: '/cases/<file>.jpg'` here plus
// `:image="caseItem.image"` on the component below.
const cases = [
  {
    title: 'Bookingsystem til klinikkæde',
    sector: 'Sundhed',
    description:
      'Fælles bookingplatform for otte klinikker, der samlede kalendere, journalhenvisninger og SMS-påmindelser ét sted. Aflyste tider frigives automatisk til ventelisten.',
    result: '38% færre udeblivelser',
    stack: ['Nuxt', 'PostgreSQL', 'Twilio'],
  },
  {
    title: 'Lagerstyring for grossist',
    sector: 'Engroshandel',
    description:
      'Internt system til varemodtagelse, lokationer og plukning, bygget oven på et eksisterende ERP. Scannere på lageret skriver direkte ind i samme datamodel som kontoret arbejder i.',
    result: 'Optælling fra 3 dage til 4 timer',
    stack: ['Vue', 'Node', 'REST API'],
  },
  {
    title: 'Prisovervågning og scraping',
    sector: 'E-commerce',
    description:
      'Automatiseret indsamling af konkurrentpriser på tværs af 40 webshops, normaliseret til én varekatalogsnøgle og leveret som dagligt prisoverblik med afvigelsesalarmer.',
    result: '40 kilder, opdateret dagligt',
    stack: ['Python', 'Playwright', 'Scheduled jobs'],
  },
  {
    title: 'Kundeportal til rådgivningshus',
    sector: 'Rådgivning',
    description:
      'Selvbetjeningsportal hvor kunder følger deres sager, henter dokumenter og godkender oplæg digitalt — i stedet for at det hele gik gennem vedhæftede filer i mails.',
    result: 'Halveret manuel sagsopfølgning',
    stack: ['Nuxt', 'Auth', 'Dokumenthåndtering'],
  },
  {
    title: 'Vagtplanlægning til restauration',
    sector: 'Restauration',
    description:
      'Planlægningsværktøj der tager højde for åbningstider, kompetencer og lønbudget, og som lader personalet bytte vagter indbyrdes uden at lederen skal ind over hver gang.',
    result: 'Vagtplan lagt på under en time',
    stack: ['Vue', 'PostgreSQL', 'Rollestyring'],
  },
  {
    title: 'Integration mellem webshop og økonomi',
    sector: 'Detail',
    description:
      'Toevejsintegration mellem webshop, lager og økonomisystem, så ordrer, kreditnotaer og lagertal holder sig synkrone uden manuel indtastning i to systemer.',
    result: 'Ingen manuel indtastning',
    stack: ['Webhooks', 'REST API', 'Data sync'],
  },
]

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
          Projekter vi har
          <span>bygget for kunder.</span>
        </h1>

        <p class="hero-description">
          Et udsnit af de løsninger, vi har leveret — hvad kunden stod med,
          hvad vi byggede, og hvad det flyttede.
        </p>
      </div>
    </section>

    <!-- Full-bleed band, same treatment as the services grid. -->
    <section class="cases-band">
      <div class="cases-container">
        <div ref="gridEl" class="cases-grid">
          <CaseCard
            v-for="(caseItem, index) in cases"
            :key="caseItem.title"
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
  max-width: 1360px;

  margin: 0 auto;
}

/* =========================
   HERO
   ========================= */

.cases-hero {
  padding: 84px 40px 70px;
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
   BAND
   ========================= */

.cases-band {
  width: 100%;

  padding: 56px 40px 70px;

  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);

  background: var(--card-canvas);
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
  .cases-hero {
    padding: 56px 18px 44px;
  }

  .cases-hero h1 {
    font-size: clamp(40px, 12vw, 58px);
  }

  .hero-description {
    font-size: 15px;
  }

  .cases-band {
    padding: 40px 18px 56px;
  }

  .cases-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
}
</style>
