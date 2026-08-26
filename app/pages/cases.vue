<script setup lang="ts">
import { ref } from 'vue'
import { useStairReveal } from '~/composables/useStairReveal'
import { useCardTilt } from '~/composables/useCardTilt'

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

const accentColors = ['#d2ff00', '#b2c73a', '#ff6b00', '#8fa62e']

const gridEl = ref<HTMLElement | null>(null)

useStairReveal(gridEl, '.case-card', {
  direction: (i) => (i % 2 === 0 ? 'left' : 'right'),
})
useCardTilt(gridEl, '.case-card')
</script>

<template>
  <main class="cases-page">
    <div class="cases-container">
      <span class="section-kicker">Cases</span>

      <h1>
        Projekter vi har
        <span>bygget for kunder.</span>
      </h1>

      <div ref="gridEl" class="cases-grid">
        <CaseCard
          v-for="(caseItem, index) in cases"
          :key="caseItem.title"
          :title="caseItem.title"
          :description="caseItem.description"
          :image="caseItem.image"
          :accent="accentColors[index % accentColors.length]"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.cases-page {
  min-height: 100vh;

  padding: 64px 40px 120px;

  background: var(--bg);
}

.cases-container {
  max-width: 1360px;

  margin: 0 auto;
}

.section-kicker {
  display: block;

  margin-bottom: 22px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 60px;

  max-width: 700px;

  color: var(--ink);

  font-size: clamp(36px, 4.4vw, 56px);
  font-weight: 700;

  line-height: 1.04;
  letter-spacing: -0.02em;
}

h1 span {
  display: block;

  color: var(--accent);
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 22px;

  /* Shared vanishing point for the per-card tilt. */
  perspective: 1200px;
}

/* Written from the grid, not from .case-card:hover in CaseCard.vue: the
   reveal's `html.js .reveal-item.is-visible { transform: none }` scores
   (0,3,1) and outranks a scoped .case-card:hover at (0,3,0), so the lift
   there never actually applied. From here it wins at (0,5,0).
   --tilt-x / --tilt-y come from useCardTilt and default to 0deg. */
.cases-grid .case-card.is-visible:hover {
  z-index: 2;

  transform:
    translateY(-6px)
    rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg));
}

.cases-grid .case-card.is-visible {
  transition:
    transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 240ms ease,
    border-color 240ms ease;
}

@media (max-width: 750px) {
  .cases-page {
    padding: 50px 18px 90px;
  }

  h1 {
    margin-bottom: 44px;

    font-size: clamp(32px, 10vw, 44px);
  }

  .cases-grid {
    grid-template-columns: 1fr;

    gap: 18px;
  }
}
</style>
