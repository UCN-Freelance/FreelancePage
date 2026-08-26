<template>
  <section class="services-hero">
    <div class="hero-container">
      <div class="hero-copy">
        <span class="hero-label">
          Ydelser
        </span>

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
    </div>
  </section>
</template>

<style scoped>
.services-hero {
  padding: 110px 24px 100px;
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

  margin-bottom: 24px;

  color: #818793;

  font-size: 11px;
  font-weight: 650;

  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-copy h1 {
  margin: 0;

  color: #111520;

  font-size: clamp(58px, 7vw, 96px);
  font-weight: 650;

  line-height: 0.91;
  letter-spacing: -0.065em;
}

.hero-copy h1 span {
  display: block;

  color: #a1a6af;
}

.hero-copy p {
  max-width: 700px;

  margin: 34px 0 0;

  color: #676d78;

  font-size: 17px;
  line-height: 1.75;
}

.hero-side {
  width: 220px;

  flex-shrink: 0;

  padding-top: 18px;

  border-top: 1px solid rgba(17, 21, 32, 0.1);
}

.side-number {
  display: block;

  margin-bottom: 14px;

  color: #9ba0aa;

  font-size: 10px;
  font-weight: 650;

  letter-spacing: 0.08em;
}

.hero-side p {
  margin: 0;

  color: #757b86;

  font-size: 12px;
  line-height: 1.65;
}

@media (max-width: 850px) {
  .services-hero {
    padding: 80px 18px 70px;
  }

  .hero-container {
    display: block;
  }

  .hero-copy h1 {
    font-size: clamp(52px, 14vw, 76px);
  }

  .hero-copy p {
    font-size: 15px;
  }

  .hero-side {
    width: 100%;

    margin-top: 50px;
  }
}
</style>