<script setup lang="ts">
const services = [
  {
    number: '01',
    title: 'Webudvikling',
    description:
      'Moderne hjemmesider og webapplikationer bygget med fokus på performance, brugervenlighed og et stærkt visuelt udtryk.',
  },
  {
    number: '02',
    title: 'Softwareløsninger',
    description:
      'Skræddersyede digitale løsninger, der automatiserer arbejdsgange og løser konkrete forretningsmæssige behov.',
  },
  {
    number: '03',
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
            UCN Freelance er et team af syv udviklere, der hjælper virksomheder
            med at udvikle moderne software, webapplikationer og digitale
            produkter.
          </p>

          <div class="hero-actions">
            <NuxtLink to="/contact" class="primary-button">
              <span>Start et projekt</span>

              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
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

          <div class="hero-meta">
            <div class="meta-item">
              <strong>7</strong>
              <span>Udviklere</span>
            </div>

            <div class="meta-divider" />

            <div class="meta-item">
              <strong>1</strong>
              <span>Samlet team</span>
            </div>

            <div class="meta-divider" />

            <div class="meta-item">
              <strong>100%</strong>
              <span>Fokus på løsningen</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="logo-glow logo-glow-one" />
          <div class="logo-glow logo-glow-two" />

          <div class="logo-card">
            <img
              src="/LogoUCNFreelance.png"
              alt="UCN Freelance"
              class="hero-logo"
            />
          </div>

          <div class="floating-tag floating-tag-bottom">
            <span>Web</span>
            <span>Software</span>
            <span>Design</span>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO -->
    <section class="intro-section">
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

        <div class="services-grid">
          <article
            v-for="service in services"
            :key="service.number"
            class="service-card"
          >
            <span class="service-number">
              {{ service.number }}
            </span>

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
            Hvorfor UCN Freelance?
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

        <div class="principles-list">
          <div
            v-for="(principle, index) in principles"
            :key="principle"
            class="principle"
          >
            <span>
              0{{ index + 1 }}
            </span>

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

            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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
  overflow: hidden;
  background: #f8f9fb;
  color: #111520;
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

  color: #808691;

  font-size: 12px;
  font-weight: 650;

  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* =========================
   HERO
   ========================= */

.hero {
  position: relative;
  padding: 76px 0 120px;
}

.hero-container {
  min-height: 650px;

  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);

  align-items: center;

  gap: 70px;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero h1 {
  max-width: 720px;

  margin: 0;

  font-size: clamp(58px, 6vw, 88px);
  font-weight: 650;

  line-height: 0.92;
  letter-spacing: -0.065em;
}

.hero h1 span {
  display: block;

  color: #9ea4ae;
}

.hero-description {
  max-width: 590px;

  margin: 34px 0 0;

  color: #626874;

  font-size: 17px;
  line-height: 1.75;
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

  border-radius: 13px;

  font-size: 13px;
  font-weight: 650;

  text-decoration: none;

  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.primary-button {
  gap: 10px;

  padding: 0 20px;

  background: #111520;
  color: white;

  box-shadow:
    0 8px 24px rgba(17, 21, 32, 0.14);
}

.primary-button svg {
  width: 18px;
  height: 18px;

  transition: transform 180ms ease;
}

.primary-button:hover {
  transform: translateY(-2px);

  background: #202634;

  box-shadow:
    0 12px 30px rgba(17, 21, 32, 0.18);
}

.primary-button:hover svg {
  transform: translateX(3px);
}

.secondary-button {
  padding: 0 18px;

  border: 1px solid rgba(17, 21, 32, 0.09);

  background: rgba(255, 255, 255, 0.6);
  color: #383e49;
}

.secondary-button:hover {
  transform: translateY(-2px);

  background: white;
}

.hero-meta {
  display: flex;
  align-items: center;

  gap: 20px;

  margin-top: 54px;
}

.meta-item {
  display: flex;
  flex-direction: column;

  gap: 3px;
}

.meta-item strong {
  font-size: 20px;
  font-weight: 700;

  letter-spacing: -0.04em;
}

.meta-item span {
  color: #858b95;

  font-size: 11px;
  font-weight: 500;
}

.meta-divider {
  width: 1px;
  height: 34px;

  background: rgba(17, 21, 32, 0.09);
}

/* =========================
   HERO LOGO
   ========================= */

.hero-visual {
  position: relative;

  min-height: 560px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-card {
  position: relative;
  z-index: 2;

  width: min(100%, 500px);
  aspect-ratio: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 62px;

  border: 1px solid rgba(17, 21, 32, 0.07);
  border-radius: 36px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.95),
      rgba(244, 246, 249, 0.75)
    );

  box-shadow:
    0 20px 70px rgba(20, 25, 40, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  transform: rotate(2deg);
}

.hero-logo {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: contain;

  transform: rotate(-2deg);
}

.logo-glow {
  position: absolute;

  border-radius: 50%;

  filter: blur(70px);

  pointer-events: none;
}

.logo-glow-one {
  width: 230px;
  height: 230px;

  top: 80px;
  right: 20px;

  background: rgba(40, 108, 255, 0.14);
}

.logo-glow-two {
  width: 270px;
  height: 270px;

  bottom: 30px;
  left: 10px;

  background: rgba(15, 36, 66, 0.08);
}

.floating-tag {
  position: absolute;
  z-index: 3;

  display: flex;
  align-items: center;

  border: 1px solid rgba(17, 21, 32, 0.07);

  background: rgba(255, 255, 255, 0.88);

  backdrop-filter: blur(14px);

  box-shadow:
    0 10px 28px rgba(17, 21, 32, 0.08);
}

.floating-tag-bottom {
  bottom: 48px;
  left: -16px;

  gap: 7px;

  padding: 9px;

  border-radius: 14px;
}

.floating-tag-bottom span {
  padding: 7px 10px;

  border-radius: 8px;

  background: #f3f5f7;

  color: #666c77;

  font-size: 10px;
  font-weight: 600;
}

/* =========================
   INTRO
   ========================= */

.intro-section {
  padding: 120px 0;

  border-top: 1px solid rgba(17, 21, 32, 0.07);

  background: white;
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

  font-size: clamp(42px, 5vw, 67px);
  font-weight: 650;

  line-height: 0.98;
  letter-spacing: -0.055em;
}

.intro-copy h2 span,
.services-header h2 span,
.why-copy h2 span {
  display: block;

  color: #a2a7b0;
}

.intro-copy > p {
  max-width: 650px;

  margin: 30px 0 0;

  color: #686e79;

  font-size: 16px;
  line-height: 1.8;
}

/* =========================
   SERVICES
   ========================= */

.services-section {
  padding: 120px 0;
}

.services-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 40px;

  margin-bottom: 70px;
}

.services-header .section-kicker {
  margin-bottom: 22px;
}

.text-link {
  flex-shrink: 0;

  margin-bottom: 8px;

  color: #555b66;

  font-size: 13px;
  font-weight: 600;

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

  gap: 18px;
}

.service-card {
  min-height: 180px;

  padding: 28px;

  display: flex;
  flex-direction: column;

  border: 1px solid rgba(17, 21, 32, 0.07);
  border-radius: 22px;

  background: rgba(255, 255, 255, 0.72);

  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;
}

.service-card:hover {
  transform: translateY(-5px);

  background: white;

  box-shadow:
    0 18px 50px rgba(18, 22, 33, 0.08);
}

.service-number {
  color: #9da2ab;

  font-size: 11px;
  font-weight: 600;

  letter-spacing: 0.08em;
}

.service-content {
  margin-top: auto;
}

.service-content h3 {
  margin: 0;

  font-size: 25px;
  font-weight: 650;

  letter-spacing: -0.035em;
}

.service-content p {
  margin: 16px 0 0;

  color: #747a85;

  font-size: 14px;
  line-height: 1.7;
}

.service-line {
  width: 100%;
  height: 1px;

  margin-top: 30px;

  background:
    linear-gradient(
      90deg,
      #246cff 0%,
      rgba(36, 108, 255, 0) 85%
    );

  opacity: 0.45;
}

/* =========================
   WHY
   ========================= */

.why-section {
  padding: 120px 0;

  background: #111520;
  color: white;
}

.why-grid {
  display: grid;
  grid-template-columns: 1fr 0.8fr;

  align-items: end;

  gap: 100px;
}

.why-copy .section-kicker {
  margin-bottom: 22px;

  color: #7e8797;
}

.why-copy h2 {
  color: white;
}

.why-copy h2 span {
  color: #656d7a;
}

.why-copy > p {
  max-width: 590px;

  margin: 28px 0 30px;

  color: #9ba2ad;

  font-size: 15px;
  line-height: 1.75;
}

.why-copy .secondary-button {
  border-color: rgba(255, 255, 255, 0.1);

  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.why-copy .secondary-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.principles-list {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.principle {
  min-height: 88px;

  display: grid;
  grid-template-columns: 55px 1fr;

  align-items: center;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.principle span {
  color: #606977;

  font-size: 10px;
  font-weight: 600;
}

.principle p {
  margin: 0;

  color: #e8eaf0;

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
  min-height: 410px;

  padding: 58px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 50px;

  border: 1px solid rgba(17, 21, 32, 0.07);
  border-radius: 30px;

  background:
    radial-gradient(
      circle at 90% 10%,
      rgba(36, 108, 255, 0.12),
      transparent 36%
    ),
    white;

  box-shadow:
    0 18px 60px rgba(18, 22, 33, 0.05);
}

.cta-label {
  display: block;

  margin-bottom: 20px;

  color: #858b96;

  font-size: 11px;
  font-weight: 650;

  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.cta-copy {
  flex: 1;
}

.cta-copy h2 {
  max-width: 720px;

  margin: 0;

  font-size: clamp(46px, 5vw, 70px);
  font-weight: 650;

  line-height: 0.95;
  letter-spacing: -0.06em;
}

.cta-copy h2 span {
  display: block;

  color: #a1a6af;
}

.cta-copy p {
  max-width: 520px;

  margin: 24px 0 0;

  color: #6c727d;

  font-size: 15px;
  line-height: 1.7;
}

/*
  Kompakt CTA i stedet for det store firkantede kort
*/
.cta-large-button {
  width: auto;
  height: 54px;

  flex-shrink: 0;

  padding: 0 20px;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 11px;

  border-radius: 14px;

  background: #111520;
  color: white;

  font-size: 13px;
  font-weight: 650;

  text-decoration: none;

  box-shadow:
    0 8px 22px rgba(17, 21, 32, 0.14);

  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.cta-large-button span {
  white-space: nowrap;

  font-size: 13px;
  font-weight: 650;
}

.cta-large-button svg {
  width: 19px;
  height: 19px;

  flex-shrink: 0;

  transition: transform 180ms ease;
}

.cta-large-button:hover {
  transform: translateY(-2px);

  background: #202634;

  box-shadow:
    0 12px 28px rgba(17, 21, 32, 0.18);
}

.cta-large-button:hover svg {
  transform: translateX(3px);
}

/* =========================
   RESPONSIVE
   ========================= */

@media (max-width: 1000px) {
  .hero {
    padding-top: 50px;
  }

  .hero-container {
    grid-template-columns: 1fr;

    gap: 50px;
  }

  .hero-content {
    max-width: 800px;
  }

  .hero-visual {
    min-height: auto;

    padding: 40px 0;
  }

  .logo-card {
    width: min(80vw, 520px);
  }

  .floating-tag-bottom {
    left: 8%;
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
    padding: 48px 0 80px;
  }

  .hero-container {
    min-height: auto;
  }

  .hero h1 {
    font-size: clamp(50px, 15vw, 70px);
  }

  .hero-description {
    font-size: 15px;
  }

  .hero-meta {
    gap: 14px;
  }

  .meta-divider {
    height: 28px;
  }

  .logo-card {
    width: 100%;

    padding: 42px;

    border-radius: 28px;
  }

  .floating-tag-bottom {
    bottom: 6px;
    left: 4px;
  }

  .intro-section,
  .services-section,
  .why-section {
    padding: 80px 0;
  }

  .intro-copy h2,
  .services-header h2,
  .why-copy h2 {
    font-size: clamp(40px, 12vw, 56px);
  }

  .services-header {
    align-items: flex-start;
    flex-direction: column;

    margin-bottom: 45px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-card {
    min-height: 290px;
  }

  .cta-section {
    padding: 70px 0 90px;
  }

  .cta-card {
    min-height: auto;

    padding: 34px;

    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    gap: 34px;

    border-radius: 24px;
  }

  .cta-copy h2 {
    font-size: clamp(44px, 12vw, 58px);
  }

  .cta-large-button {
    width: auto;
    height: 52px;

    padding: 0 18px;
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

  .hero-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 10px;
  }

  .meta-divider {
    display: none;
  }

  .meta-item strong {
    font-size: 17px;
  }

  .meta-item span {
    font-size: 9px;
  }

  .floating-tag-bottom {
    position: relative;

    bottom: auto;
    left: auto;

    width: fit-content;

    margin: -15px auto 0;
  }

  .cta-card {
    padding: 28px;
  }

  .cta-large-button {
    width: 100%;
  }
}
</style>