<script setup lang="ts">
import { ref } from 'vue'
import { useStairReveal } from '~/composables/useStairReveal'
import { useCardTilt } from '~/composables/useCardTilt'

const services = [
  {
    title: 'Webudvikling',
    description:
      'Moderne, hurtige og responsive hjemmesider bygget med fokus på brugeroplevelse, performance og et professionelt visuelt udtryk.',
    items: [
      'Nuxt',
      'Vue',
      'Responsive design',
      'Landing pages',
      'CMS',
      'SEO',
    ],
  },
  {
    title: 'Webapplikationer',
    description:
      'Skræddersyede webbaserede systemer til virksomheder, medarbejdere og kunder — fra simple portaler til komplette platforme.',
    items: [
      'Dashboards',
      'Kundeportaler',
      'Adminsystemer',
      'SaaS',
      'Interne tools',
    ],
  },
  {
    title: 'Scrapers & data',
    description:
      'Automatiseret indsamling og strukturering af data fra hjemmesider, platforme og andre digitale datakilder.',
    items: [
      'Web scraping',
      'Data extraction',
      'Monitoring',
      'Data pipelines',
      'Databehandling',
    ],
  },
  {
    title: 'Automatisering',
    description:
      'Vi automatiserer gentagne arbejdsgange og binder systemer sammen, så manuelle processer kan køre uden konstant menneskelig indblanding.',
    items: [
      'Workflows',
      'Scheduled jobs',
      'Notifikationer',
      'Data sync',
      'Procesautomatisering',
    ],
  },
  {
    title: 'API & integrationer',
    description:
      'Integration mellem eksisterende systemer, tredjepartsservices og egne løsninger gennem stabile og veldesignede API’er.',
    items: [
      'REST API',
      'Webhooks',
      'Third-party APIs',
      'Systemintegration',
      'Authentication',
    ],
  },
  {
    title: 'Database & backend',
    description:
      'Robuste backend-løsninger og databaser, der håndterer forretningslogik, data og kommunikation mellem jeres systemer.',
    items: [
      'SQL',
      'PostgreSQL',
      'Datamodellering',
      'Backend',
      'Server logic',
      'Migrationer',
    ],
  },
  {
    title: 'Interne systemer',
    description:
      'Specialbyggede værktøjer til jeres egne medarbejdere, så data, administration og processer samles ét sted.',
    items: [
      'CRM tools',
      'Inventory',
      'Admin panels',
      'Rapportering',
      'Operations',
    ],
  },
  {
    title: 'Optimering & videreudvikling',
    description:
      'Vi kan overtage, forbedre eller udvide eksisterende software og hjælpe med performance, arkitektur og nye features.',
    items: [
      'Performance',
      'Refactoring',
      'Bug fixing',
      'Nye features',
      'Modernisering',
    ],
  },
]

const accentColors = ['#d2ff00', '#b2c73a', '#ff6b00', '#8fa62e']

const gridEl = ref<HTMLElement | null>(null)

useStairReveal(gridEl, '.service-card', {
  direction: (i) => (i % 2 === 0 ? 'left' : 'right'),
})
useCardTilt(gridEl, '.service-card')
</script>

<template>
  <section class="services-grid-section">
    <div class="services-container">
      <div class="section-header">
        <span>
          Hvad vi kan hjælpe med
        </span>

        <h2>
          Fra frontend
          <strong>til backend.</strong>
        </h2>
      </div>

      <div ref="gridEl" class="services-grid">
        <ServiceCard
          v-for="(service, index) in services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :items="service.items"
          :accent="accentColors[index % accentColors.length]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-grid-section {
  padding: 10px 40px 110px;

  /* Deeper than --bg so the white cards have something to sit on. */
  background: var(--card-canvas);
}

.services-container {
  max-width: 1360px;

  margin: 0 auto;
}

.section-header {
  margin-bottom: 50px;
}

.section-header > span {
  display: block;

  margin-bottom: 16px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.section-header h2 {
  margin: 0;

  color: var(--ink);

  font-size: clamp(36px, 4.4vw, 56px);
  font-weight: 700;

  line-height: 1.02;
  letter-spacing: -0.02em;
}

.section-header h2 strong {
  display: block;

  color: var(--slate);

  font-weight: inherit;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 20px;

  /* Shared vanishing point for the per-card tilt. Set on the grid rather
     than each card so neighbouring cards lean into one consistent space
     instead of each having its own. */
  perspective: 1200px;

  /* =======================================================
     Lift + scale are specific to this grid — the homepage
     mosaic has flush 1px seams that scaling would tear open.
     The shared knobs (--card-surface, --card-dim,
     --card-hover-ms) are in :root in main.css. Override any
     of them here to make /services differ from the homepage.
     ======================================================= */

  /* How much the hovered card grows. 1 = no growth. */
  --card-hover-scale: 1.035;

  /* How far the hovered card lifts. Negative = upward. */
  --card-hover-lift: -6px;
}

/* The reveal (useStairReveal) owns opacity + transform on its way in and
   wins on specificity, so the hover states only take over once .is-visible
   is on — and they set their own transition to escape the slower 560ms
   entrance one. */
.services-grid .service-card.is-visible {
  transition:
    opacity var(--card-hover-ms) ease,
    transform var(--card-hover-ms) cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow var(--card-hover-ms) ease,
    border-color var(--card-hover-ms) ease;
}

/* Hovering anywhere in the grid pushes every card back... */
.services-grid:hover .service-card.is-visible {
  opacity: var(--card-dim);
}

/* ...and the one actually under the cursor comes forward, leaning toward
   the pointer. --tilt-x / --tilt-y are written per-card by useCardTilt;
   they default to 0deg so the rule is inert until it has real values,
   and stay 0deg for reduced-motion and touch, where the composable
   never attaches. */
.services-grid .service-card.is-visible:hover {
  z-index: 2;

  opacity: 1;
  transform:
    translateY(var(--card-hover-lift))
    scale(var(--card-hover-scale))
    rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg));
}

@media (max-width: 1050px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .services-grid-section {
    padding: 10px 18px 70px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
