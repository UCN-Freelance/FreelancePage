<script setup lang="ts">
const services = [
  {
    number: '01',
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
    number: '02',
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
    number: '03',
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
    number: '04',
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
    number: '05',
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
    number: '06',
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
    number: '07',
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
    number: '08',
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

      <div class="services-grid">
        <ServiceCard
          v-for="service in services"
          :key="service.number"
          :number="service.number"
          :title="service.title"
          :description="service.description"
          :items="service.items"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-grid-section {
  padding: 20px 24px 120px;
}

.services-container {
  max-width: 1240px;

  margin: 0 auto;
}

.section-header {
  margin-bottom: 55px;
}

.section-header > span {
  display: block;

  margin-bottom: 18px;

  color: #898f99;

  font-size: 10px;
  font-weight: 650;

  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-header h2 {
  margin: 0;

  color: #111520;

  font-size: clamp(44px, 5vw, 68px);
  font-weight: 650;

  line-height: 0.96;
  letter-spacing: -0.055em;
}

.section-header h2 strong {
  display: block;

  color: #a1a6af;

  font-weight: inherit;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 18px;
}

@media (max-width: 750px) {
  .services-grid-section {
    padding: 10px 18px 80px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>