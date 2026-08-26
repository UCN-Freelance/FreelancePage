<script setup lang="ts">
import { ref } from 'vue'
import { useStairReveal } from '~/composables/useStairReveal'

const services = [
  {
    title: 'Webudvikling',
    description:
      'Moderne hjemmesider og webapplikationer bygget med fokus på performance, brugervenlighed og et stærkt visuelt udtryk.',
  },
  {
    title: 'Softwareløsninger',
    description:
      'Skræddersyede digitale løsninger, der automatiserer arbejdsgange og løser konkrete forretningsmæssige behov.',
  },
  {
    title: 'UI / UX',
    description:
      'Intuitive og moderne interfaces, hvor funktionalitet og design arbejder sammen fra første klik.',
  },
]

const principles = [
  'Direkte dialog med udviklerne',
  'Fleksibelt samarbejde',
  'Moderne teknologier',
  'Fokus på reel forretningsværdi',
]

const crew = [
  'Omid',
  'Mozamel',
  'Oliver',
  'Patrick',
  'Frederik',
  'Peter',
  'Magnus',
]

const servicesGridEl = ref<HTMLElement | null>(null)
const principlesListEl = ref<HTMLElement | null>(null)

useStairReveal(servicesGridEl, '.service-card', {
  direction: (i) => (i === 0 ? 'left' : i === 2 ? 'right' : 'up'),
})
useStairReveal(principlesListEl, '.principle', { direction: 'right' })
</script>

<template>
  <main>
    <!-- HERO -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
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

          <div class="hero-crew">
            <span class="crew-label">Bygget af</span>
            <p>
              <span v-for="(name, i) in crew" :key="name">{{ name }}<template v-if="i < crew.length - 1">, </template></span>
            </p>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-caption">
            <span>Web</span>
            <span>Software</span>
            <span>Design</span>
          </div>
        </div>
      </div>

      <a href="#intro" class="next-cue">
        <span>Næste trin</span>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 3v10M3.5 9l4.5 4.5L12.5 9"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </section>

    <!-- INTRO -->
    <section id="intro" class="intro-section">
      <div class="content-container intro-grid">
        <p class="section-kicker">
          Et mindre team. Tættere samarbejde.
        </p>

        <div class="intro-copy">
          <h2>
            Ingen tunge processer.
            <span>Bare dygtige mennesker og god software.</span>
          </h2>

          <p>
            Hos os arbejder du direkte sammen med de mennesker, der designer
            og udvikler din løsning. Det giver hurtigere kommunikation, færre
            misforståelser og et produkt, der passer til det faktiske behov.
          </p>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="services-section">
      <div class="content-container">
        <div class="services-header">
          <div>
            <p class="section-kicker">
              Hvad vi laver
            </p>

            <h2>
              Fra idé til
              <span>færdig løsning.</span>
            </h2>
          </div>

          <NuxtLink to="/services" class="text-link">
            Alle ydelser
            <span>↗</span>
          </NuxtLink>
        </div>

        <div ref="servicesGridEl" class="services-grid">
          <article
            v-for="service in services"
            :key="service.title"
            class="service-card"
          >
            <div class="service-content">
              <h3>{{ service.title }}</h3>

              <p>
                {{ service.description }}
              </p>
            </div>

            <div class="service-line" />
          </article>
        </div>
      </div>
    </section>

    <!-- WHY US -->
    <section class="why-section">
      <div class="content-container why-grid">
        <div class="why-copy">
          <p class="section-kicker">
            Hvorfor Next Step Freelance?
          </p>

          <h2>
            Det skal være nemt at få
            <span>god software bygget.</span>
          </h2>

          <p>
            Vi holder samarbejdet simpelt, kommunikationen direkte og
            udviklingen fokuseret på det, der giver værdi.
          </p>

          <NuxtLink to="/about" class="secondary-button">
            Mød teamet
          </NuxtLink>
        </div>

        <div ref="principlesListEl" class="principles-list">
          <div
            v-for="principle in principles"
            :key="principle"
            class="principle"
          >
            <span class="principle-tick" />

            <p>
              {{ principle }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="content-container">
        <div class="cta-card">
          <div class="cta-copy">
            <span class="cta-label">
              Har du en idé?
            </span>

            <h2>
              Lad os bygge
              <span>noget godt sammen.</span>
            </h2>

            <p>
              Fortæl os kort om projektet, så finder vi ud af, hvordan vi bedst
              kan hjælpe.
            </p>
          </div>

          <NuxtLink to="/contact" class="cta-large-button">
            <span>Kontakt os</span>

            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 12h12M13 7l5 5-5 5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  color: var(--ink);
}

/* =========================
   SHARED
   ========================= */

.content-container,
.hero-container {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
}

.section-kicker {
  margin: 0;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* =========================
   HERO
   ========================= */

.hero {
  position: relative;

  padding: 64px 0 120px;
}

.hero-container {
  min-height: 620px;

  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);

  align-items: center;

  gap: 70px;
}

.hero-content {
  position: relative;
}

.hero h1 {
  max-width: 720px;

  margin: 0;

  font-size: clamp(52px, 5.6vw, 80px);
  font-weight: 700;

  line-height: 0.96;
  letter-spacing: -0.03em;
}

.hero h1 span {
  display: block;

  color: var(--accent);
}

.hero-description {
  max-width: 560px;

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

  margin-top: 34px;
}

.primary-button,
.secondary-button {
  height: 50px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--radius-sm);

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 180ms ease,
    color 180ms ease,
    border-color 180ms ease;
}

.primary-button {
  gap: 10px;

  padding: 0 20px;

  background: var(--chip-bg);
  color: var(--chip-text);
}

.primary-button svg {
  width: 18px;
  height: 18px;

  transition: transform 180ms ease;
}

.primary-button:hover {
  background: var(--accent);
  color: var(--accent-ink);
}

.primary-button:hover svg {
  transform: translateX(3px);
}

.secondary-button {
  padding: 0 18px;

  border: 1px solid var(--line-strong);

  background: transparent;
  color: var(--ink-soft);
}

.secondary-button:hover {
  border-color: var(--ink);
  color: var(--ink);
}

.hero-crew {
  margin-top: 54px;
  padding-top: 22px;

  border-top: 1px solid var(--line);
}

.crew-label {
  display: block;

  margin-bottom: 8px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 10px;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero-crew p {
  margin: 0;
  max-width: 420px;

  color: var(--ink-soft);

  font-size: 13px;
  line-height: 1.7;
}

/* =========================
   HERO STAIRCASE
   ========================= */

.hero-visual {
  position: relative;

  min-height: 480px;

  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.visual-caption {
  position: absolute;
  top: 10px;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 6px;
}

.visual-caption span {
  padding: 5px 10px;

  border: 1px solid var(--line);
  border-radius: var(--radius-sm);

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 10px;
}

.next-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 4px;

  color: var(--slate);

  text-decoration: none;

  transform: translateX(-50%);

  animation: cue-bounce 2200ms ease-in-out infinite;
}

.next-cue span {
  font-family: var(--font-mono);
  font-size: 10px;

  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.next-cue svg {
  width: 14px;
  height: 14px;
}

.next-cue:hover {
  color: var(--accent);
}

@keyframes cue-bounce {
  0%,
  100% {
    transform: translate(-50%, 0);
  }

  50% {
    transform: translate(-50%, 6px);
  }
}

/* =========================
   INTRO
   ========================= */

.intro-section {
  padding: 110px 0;

  border-top: 1px solid var(--line);
  background: var(--bg-raised);
}

.intro-grid {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);

  gap: 80px;
}

.intro-copy {
  max-width: 820px;
}

.intro-copy h2,
.services-header h2,
.why-copy h2 {
  margin: 0;

  font-size: clamp(38px, 4.4vw, 58px);
  font-weight: 700;

  line-height: 1.04;
  letter-spacing: -0.02em;
}

.intro-copy h2 span,
.services-header h2 span,
.why-copy h2 span {
  display: block;

  color: var(--slate);
}

.intro-copy > p {
  max-width: 650px;

  margin: 28px 0 0;

  color: var(--ink-soft);

  font-size: 16px;
  line-height: 1.8;
}

/* =========================
   SERVICES
   ========================= */

.services-section {
  padding: 110px 0;

  background: var(--bg);
}

.services-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 40px;

  margin-bottom: 60px;
}

.services-header .section-kicker {
  margin-bottom: 20px;
}

.text-link {
  flex-shrink: 0;

  margin-bottom: 8px;

  color: var(--ink-soft);

  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;

  text-decoration: none;
}

.text-link span {
  display: inline-block;

  margin-left: 5px;

  transition: transform 180ms ease;
}

.text-link:hover span {
  transform: translate(2px, -2px);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 1px;

  border: 1px solid var(--line);
  background: var(--line);
}

.service-card {
  min-height: 200px;

  padding: 28px;

  display: flex;
  flex-direction: column;

  background: var(--bg);

  transition: background-color 220ms ease;
}

.service-card:hover {
  background: var(--bg-raised);
}

.service-content h3 {
  margin: 0;

  font-size: 24px;
  font-weight: 700;

  letter-spacing: -0.02em;
}

.service-content p {
  margin: 14px 0 0;

  color: var(--slate);

  font-size: 14px;
  line-height: 1.65;
}

.service-line {
  width: 32px;
  height: 2px;

  margin-top: auto;

  background: var(--accent);
}

.service-card:hover .service-line {
  background: var(--accent);
}

/* =========================
   WHY
   ========================= */

.why-section {
  padding: 110px 0;
}

.why-grid {
  display: grid;
  grid-template-columns: 1fr 0.8fr;

  align-items: end;

  gap: 100px;
}

.why-copy .section-kicker {
  margin-bottom: 20px;
}

.why-copy > p {
  max-width: 590px;

  margin: 26px 0 30px;

  color: var(--ink-soft);

  font-size: 15px;
  line-height: 1.75;
}

.why-copy .secondary-button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.principles-list {
  border-top: 1px solid var(--line);
}

.principle {
  min-height: 84px;

  display: grid;
  grid-template-columns: 46px 1fr;

  align-items: center;

  border-bottom: 1px solid var(--line);
}

.principle-tick {
  width: 16px;
  height: 2px;

  background: var(--success);

  transition: background 220ms ease, width 220ms ease;
}

.principle:hover .principle-tick {
  width: 24px;

  background: var(--accent);
}

.principle p {
  margin: 0;

  color: var(--ink);

  font-size: 15px;
  font-weight: 500;
}

/* =========================
   FINAL CTA
   ========================= */

.cta-section {
  padding: 100px 0 120px;
}

.cta-card {
  min-height: 380px;

  padding: 56px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 50px;

  border: 1px solid var(--line-strong);
  background: var(--bg-raised);
}

.cta-label {
  display: block;

  margin-bottom: 18px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 11px;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.cta-copy {
  flex: 1;
}

.cta-copy h2 {
  max-width: 680px;

  margin: 0;

  font-size: clamp(38px, 4.4vw, 58px);
  font-weight: 700;

  line-height: 1.02;
  letter-spacing: -0.02em;
}

.cta-copy h2 span {
  display: block;

  color: var(--slate);
}

.cta-copy p {
  max-width: 520px;

  margin: 22px 0 0;

  color: var(--ink-soft);

  font-size: 15px;
  line-height: 1.7;
}

.cta-large-button {
  height: 54px;

  flex-shrink: 0;

  padding: 0 20px;

  display: inline-flex;
  align-items: center;

  gap: 11px;

  border-radius: var(--radius-sm);

  background: var(--chip-bg);
  color: var(--chip-text);

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 180ms ease,
    color 180ms ease;
}

.cta-large-button svg {
  width: 19px;
  height: 19px;

  transition: transform 180ms ease;
}

.cta-large-button:hover {
  background: var(--accent);
  color: var(--accent-ink);
}

.cta-large-button:hover svg {
  transform: translateX(3px);
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 1000px) {
  .hero-container {
    grid-template-columns: 1fr;

    gap: 50px;
  }

  .hero-content {
    max-width: 800px;
  }

  .hero-visual {
    min-height: auto;

    padding: 20px 0 0;
  }

  .intro-grid {
    grid-template-columns: 1fr;

    gap: 30px;
  }

  .why-grid {
    grid-template-columns: 1fr;

    gap: 60px;
  }
}

@media (max-width: 760px) {
  .content-container,
  .hero-container {
    width: min(100% - 36px, 1240px);
  }

  .hero {
    padding: 40px 0 70px;
  }

  .hero-container {
    min-height: auto;
  }

  .hero h1 {
    font-size: clamp(42px, 12vw, 60px);
  }

  .hero-description {
    font-size: 15px;
  }

  .intro-section,
  .services-section,
  .why-section {
    padding: 70px 0;
  }

  .intro-copy h2,
  .services-header h2,
  .why-copy h2 {
    font-size: clamp(34px, 10vw, 44px);
  }

  .services-header {
    align-items: flex-start;
    flex-direction: column;

    margin-bottom: 40px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 60px 0 80px;
  }

  .cta-card {
    min-height: auto;

    padding: 30px;

    flex-direction: column;
    align-items: flex-start;

    gap: 30px;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .cta-large-button {
    width: 100%;
  }
}
</style>
