<script setup lang="ts">
const cases = [
  {
    title: 'Case 1',
    description:
      'En kort beskrivelse af projektet, hvad kunden havde brug for, og hvilken løsning vi udviklede.',
    image: '/cases/case1.jpg',
  },
  {
    title: 'Case 2',
    description:
      'En kort beskrivelse af projektet, løsningen og den værdi systemet skabte for kunden.',
    image: '/cases/case2.jpg',
  },
  {
    title: 'Case 3',
    description:
      'Et digitalt projekt udviklet med fokus på brugervenlighed, performance og en enkel arbejdsgang.',
    image: '/cases/case3.jpg',
  },
  {
    title: 'Case 4',
    description:
      'En skræddersyet løsning bygget til at automatisere og forbedre en eksisterende proces.',
    image: '/cases/case4.jpg',
  },
]
</script>

<template>
  <main class="cases-page">
    <div class="cases-container">
      <div class="cases-grid">
        <CaseCard
          v-for="caseItem in cases"
          :key="caseItem.title"
          :title="caseItem.title"
          :description="caseItem.description"
          :image="caseItem.image"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.cases-page {
  min-height: 100vh;

  padding: 80px 24px 120px;

  background: #f8f9fb;
}

.cases-container {
  max-width: 1240px;

  margin: 0 auto;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 22px;
}

@media (max-width: 750px) {
  .cases-page {
    padding: 60px 18px 90px;
  }

  .cases-grid {
    grid-template-columns: 1fr;

    gap: 18px;
  }
}
</style>