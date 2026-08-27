<script setup lang="ts">

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

const accentColors = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3']
</script>

<template>
  <!-- .section-box (main.css) is the shared panel every grid on the site
       sits in: inset from both page edges and rounded, so it reads as a
       box holding the cards. -->
  <section class="services-grid-section">
    <div class="section-box">
      <div class="services-grid">
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
  /* The panel itself is .section-box; this only spaces it from the hero
     above and the contact box below. */
  padding: 8px 0 40px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  /* Cards open independently and therefore differ in height; start them
     at the top of their row so an open card grows downward instead of
     stretching its neighbours to match. */
  align-items: start;

  gap: 20px;

  /* How far the hovered card lifts. Negative = upward. */
  --card-hover-lift: -4px;
}

/* These used to be qualified with .is-visible, the class the scroll-reveal
   added, purely so they'd outrank its entrance transform. The reveal is
   gone, so the plain selectors are enough. */
.services-grid .service-card {
  transition:
    transform var(--card-hover-ms) cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow var(--card-hover-ms) ease,
    border-color var(--card-hover-ms) ease;
}

/* A plain lift, with no scale and no dimming of the neighbours: the cards
   expand in place now, and both of those fought with reading one that is
   open — scale blurred its text mid-transition, and the dim greyed out
   the seven cards you were comparing it against. */
.services-grid .service-card:hover {
  z-index: 2;

  transform: translateY(var(--card-hover-lift));
}

@media (max-width: 1050px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .services-grid-section {
    padding: 4px 0 28px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
