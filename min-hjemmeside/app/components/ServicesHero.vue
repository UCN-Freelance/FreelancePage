<template>
  <section class="services-hero">
    <div class="hero-container">
      <div class="hero-copy">
        <span class="hero-label">Ydelser</span>

        <h1>
          Software bygget
          <span>omkring jeres behov.</span>
        </h1>

        <p>
          Fra moderne hjemmesider og interne systemer til automatisering,
          dataindsamling og integrationer. Vi bygger digitale løsninger,
          der løser konkrete problemer og passer ind i den måde, I arbejder på.
        </p>
      </div>

      <div class="hero-side">
        <span class="side-number">Discipliner</span>
        <p>
          Se listen nedenfor for at finde det, der matcher jeres udfordring —
          eller skriv til os, hvis I er i tvivl om, hvor I skal starte.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-hero {
  padding: 64px 24px 90px;
}

.hero-container {
  max-width: 1240px;
  margin: 0 auto;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 80px;
}

.hero-copy {
  max-width: 900px;
}

.hero-label {
  display: block;

  margin-bottom: 22px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero-copy h1 {
  margin: 0;

  color: var(--ink);

  font-size: clamp(46px, 6vw, 76px);
  font-weight: 700;

  line-height: 0.98;
  letter-spacing: -0.03em;
}

.hero-copy h1 span {
  display: block;

  color: var(--accent);
}

.hero-copy p {
  max-width: 700px;

  margin: 30px 0 0;

  color: var(--ink-soft);

  font-size: 17px;
  line-height: 1.7;
}

.hero-side {
  width: 220px;

  flex-shrink: 0;

  padding-top: 18px;

  border-top: 1px solid var(--line-strong);
}

.side-number {
  display: block;

  margin-bottom: 12px;

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
}

.hero-side p {
  margin: 0;

  color: var(--slate);

  font-size: 12px;
  line-height: 1.65;
}

@media (max-width: 850px) {
  .services-hero {
    padding: 50px 18px 60px;
  }

  .hero-container {
    display: block;
  }

  .hero-copy h1 {
    font-size: clamp(40px, 13vw, 60px);
  }

  .hero-copy p {
    font-size: 15px;
  }

  .hero-side {
    width: 100%;

    margin-top: 40px;
  }
}
</style>
