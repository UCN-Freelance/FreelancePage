<template>
  <main class="services-page">
    <ServicesHero />
    <ServicesGrid />

    <ContactCta
      label="Ikke sikker på hvor I starter?"
      heading="Ikke alle projekter"
      heading-accent="passer i en kategori."
      body="Har I en idé, et problem eller et eksisterende system, der skal forbedres, så tag fat i os. Vi finder ud af, hvad der giver mening."
      cta="Kontakt os"
    />
  </main>
</template>

<style scoped>
.services-page {
  min-height: 100vh;
  color: var(--ink);
}
</style>
