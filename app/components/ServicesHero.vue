<template>
  <section class="services-hero">
    <div class="hero-container">
      <div class="hero-copy">
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
  padding: 84px 24px 70px;
}

.hero-container {
  max-width: 1240px;
  margin: 0 auto;
}

.hero-copy {
  max-width: 900px;
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

@media (max-width: 850px) {
  .services-hero {
    padding: 56px 18px 48px;
  }

  .hero-copy h1 {
    font-size: clamp(40px, 13vw, 60px);
  }

  .hero-copy p {
    font-size: 15px;
  }
}
</style>
