<script setup lang="ts">
import { caseStudies, findCase } from '~/data/cases'

const route = useRoute()

const study = computed(() => findCase(String(route.params.slug)))

// A slug that isn't in the data is a genuine 404 rather than an empty
// page — otherwise a typo'd URL would render the disclaimer with no case
// attached to it.
if (!study.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case ikke fundet' })
}

useHead({
  title: () => `${study.value?.title ?? 'Case'} - Next Step Freelance`,
})

const others = computed(() =>
  caseStudies.filter((item) => item.slug !== study.value?.slug).slice(0, 3),
)
</script>

<template>
  <main v-if="study" class="case-page">
    <section class="case-hero">
      <!-- .is-plain (main.css): opaque, so the copy is not read through
           the staircase pattern behind it. -->
      <div class="section-box is-plain hero-box">
        <NuxtLink to="/cases" class="back-link">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M15 10H5M9 6l-4 4 4 4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Alle cases
        </NuxtLink>

        <span class="case-sector">{{ study.sector }}</span>

        <h1>{{ study.title }}</h1>

        <p class="case-lead">{{ study.description }}</p>

        <div class="case-meta">
          <div class="meta-block">
            <span class="meta-label">Resultat</span>
            <p>{{ study.result }}</p>
          </div>

          <div class="meta-block">
            <span class="meta-label">Teknologi</span>

            <div class="meta-stack">
              <span v-for="tech in study.stack" :key="tech">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="case-body">
      <div class="section-box">
        <div class="body-copy">
          <h2>Sådan ville vi bygge det</h2>

          <ul class="approach-list">
            <li v-for="point in study.approach" :key="point">
              <span class="approach-tick" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 8.5l3 3 6-7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>

              {{ point }}
            </li>
          </ul>
        </div>

        <!-- The honest bit. Full width and directly under the approach
             rather than in a side column: it's the reason this page
             exists, and a short approach list next to a tall aside left
             a large hole in the box. -->
        <aside v-if="!study.isReal" class="disclaimer">
          <div class="disclaimer-copy">
            <span class="disclaimer-label">Om denne case</span>

            <h2>Denne case er opdigtet.</h2>

            <p>
              Vi lægger ikke skjul på det: Next Step Freelance er et nyt hold,
              og casen ovenfor er ikke et projekt, vi har leveret. Den er et
              eksempel på den type løsning, vi bygger - skrevet for at vise,
              hvad vi kan, indtil vi har rigtige projekter at vise frem.
            </p>

            <p class="disclaimer-punch">
              Til gengæld kan du blive vores første kunde.
            </p>

            <p>
              Vi er syv udviklere fra UCN, og vi har både tiden og lysten til
              at gå all in på det første rigtige projekt. Har I en opgave, så
              lad os tage en snak om den.
            </p>
          </div>

          <NuxtLink to="/contact" class="disclaimer-cta">
            <span>Bliv vores første kunde</span>

            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 12h12M13 7l5 5-5 5"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NuxtLink>
        </aside>
      </div>
    </section>

    <section class="case-others">
      <div class="section-box is-plain">
        <h2>Andre eksempler</h2>

        <div class="others-grid">
          <NuxtLink
            v-for="other in others"
            :key="other.slug"
            :to="`/cases/${other.slug}`"
            class="other-card"
          >
            <span class="other-sector">{{ other.sector }}</span>

            <h3>{{ other.title }}</h3>

            <span class="other-cta">
              Læs mere

              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M5 10h10M11 6l4 4-4 4"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ContactCta
      label="Kom i gang"
      heading="Skal jeres projekt"
      heading-accent="være det første rigtige?"
      body="Fortæl os kort, hvad I gerne vil have bygget. Vi vender tilbage med et bud på, hvordan vi griber det an - uforpligtende."
      cta="Kontakt os"
    />
  </main>
</template>

<style scoped>
.case-page {
  min-height: 100vh;

  color: var(--ink);
}

.case-container {
  width: min(1360px, calc(100% - 56px));

  margin: 0 auto;
}

/* =========================
   HERO
   ========================= */

.case-hero {
  padding: 40px 0 20px;
}

.hero-box {
  padding-top: 40px;
  padding-bottom: 40px;
}

.back-link {
  display: inline-flex;
  align-items: center;

  gap: 8px;

  margin-bottom: 30px;

  color: var(--ink-soft);

  font-size: 15px;
  font-weight: 600;

  text-decoration: none;

  transition: color 180ms ease;
}

.back-link svg {
  width: 17px;
  height: 17px;

  transition: transform 180ms ease;
}

.back-link:hover {
  color: var(--accent);
}

.back-link:hover svg {
  transform: translateX(-3px);
}

.case-sector {
  display: block;

  margin-bottom: 16px;

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero-box h1 {
  max-width: 900px;

  margin: 0;

  font-size: clamp(38px, 4.8vw, 62px);
  font-weight: 700;

  line-height: 1.02;
  letter-spacing: -0.03em;
}

.case-lead {
  max-width: 720px;

  margin: 24px 0 0;

  color: var(--ink-soft);

  font-size: 17px;
  line-height: 1.7;
}

.case-meta {
  display: flex;
  flex-wrap: wrap;

  gap: 46px;

  margin-top: 34px;
  padding-top: 26px;

  border-top: 1px solid var(--line);
}

.meta-label {
  display: block;

  margin-bottom: 10px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.meta-block p {
  margin: 0;

  color: var(--accent);

  font-size: 17px;
  font-weight: 600;
}

.meta-stack {
  display: flex;
  flex-wrap: wrap;

  gap: 6px;
}

.meta-stack span {
  padding: 4px 9px;

  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);

  color: var(--ink-soft);

  font-family: var(--font-mono);
  font-size: 12px;
}

/* =========================
   BODY
   ========================= */

/* The panel itself is .section-box in main.css; this only spaces it. */
.case-body {
  padding: 8px 0 40px;
}

.body-copy {
  max-width: 760px;
}

.body-copy h2,
.disclaimer h2 {
  margin: 0;

  font-size: clamp(24px, 2.4vw, 30px);
  font-weight: 700;

  line-height: 1.15;
  letter-spacing: -0.02em;
}

.approach-list {
  margin: 22px 0 0;
  padding: 0;

  list-style: none;

  display: flex;
  flex-direction: column;

  gap: 14px;
}

.approach-list li {
  display: flex;
  align-items: flex-start;

  gap: 12px;

  color: var(--ink-soft);

  font-size: 16px;
  line-height: 1.6;
}

.approach-tick {
  width: 22px;
  height: 22px;

  flex-shrink: 0;

  margin-top: 2px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--accent);
  color: #ffffff;
}

.approach-tick svg {
  width: 13px;
  height: 13px;
}

/* =========================
   DISCLAIMER
   ========================= */

.disclaimer {
  margin-top: 34px;
  padding: 30px 30px 32px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 40px;

  border: 1px solid var(--line);
  border-radius: var(--radius-md);

  background: var(--card-surface);

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.06),
    0 6px 16px -8px rgba(15, 23, 42, 0.14);
}

.disclaimer-copy {
  max-width: 720px;
}

.disclaimer-label {
  display: block;

  margin-bottom: 14px;

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.disclaimer p {
  margin: 16px 0 0;

  color: var(--ink-soft);

  font-size: 15px;
  line-height: 1.7;
}

.disclaimer-punch {
  color: var(--ink) !important;

  font-size: 17px !important;
  font-weight: 700;
}

.disclaimer-cta {
  height: 52px;

  flex-shrink: 0;

  padding: 0 24px;

  display: inline-flex;
  align-items: center;

  gap: 10px;

  border-radius: var(--radius-md);

  background: var(--accent);
  color: #ffffff;

  font-size: 15px;
  font-weight: 600;

  text-decoration: none;

  box-shadow: 0 6px 18px -8px rgba(99, 102, 241, 0.7);

  transition:
    background 180ms ease,
    box-shadow 180ms ease;
}

.disclaimer-cta svg {
  width: 19px;
  height: 19px;

  transition: transform 180ms ease;
}

.disclaimer-cta:hover {
  background: #4f46e5;

  box-shadow: 0 10px 26px -10px rgba(79, 70, 229, 0.8);
}

.disclaimer-cta:hover svg {
  transform: translateX(3px);
}

/* =========================
   OTHERS
   ========================= */

.case-others {
  padding: 8px 0 40px;
}

.case-others h2 {
  margin: 0 0 22px;

  font-size: 22px;
  font-weight: 700;

  letter-spacing: -0.02em;
}

.others-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 18px;
}

.other-card {
  display: flex;
  flex-direction: column;

  padding: 22px 22px 20px;

  border: 1px solid var(--line);
  border-radius: var(--radius-md);

  background: var(--card-surface);
  color: inherit;

  text-decoration: none;

  transition:
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.other-card:hover {
  transform: translateY(-4px);

  border-color: var(--accent);

  box-shadow: 0 18px 34px -18px rgba(15, 23, 42, 0.26);
}

.other-sector {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.other-card h3 {
  margin: 12px 0 0;

  font-size: 18px;
  font-weight: 700;

  line-height: 1.25;
  letter-spacing: -0.01em;
}

.other-cta {
  margin-top: auto;
  padding-top: 18px;

  display: inline-flex;
  align-items: center;

  gap: 8px;

  color: var(--accent);

  font-size: 14px;
  font-weight: 600;
}

.other-cta svg {
  width: 16px;
  height: 16px;

  transition: transform 180ms ease;
}

.other-card:hover .other-cta svg {
  transform: translateX(4px);
}

/* =========================
   MOBILE
   ========================= */

@media (max-width: 900px) {
  .disclaimer {
    display: block;
  }

  .disclaimer-cta {
    margin-top: 24px;
  }

  .others-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 750px) {
  .case-container {
    width: calc(100% - 32px);
  }

  .case-hero {
    padding: 20px 0 12px;
  }

  .hero-box h1 {
    font-size: clamp(32px, 9vw, 44px);
  }

  .case-lead {
    font-size: 15px;
  }

  .case-meta {
    gap: 26px;
  }

  .case-body {
    padding: 4px 0 28px;
  }

  .disclaimer {
    padding: 24px 20px 26px;
  }

  .disclaimer-cta {
    width: 100%;

    justify-content: center;
  }
}
</style>
