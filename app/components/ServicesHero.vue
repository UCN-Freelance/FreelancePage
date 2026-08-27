<template>
  <section class="services-hero">
    <!-- .is-plain (main.css): opaque white, so the copy isn't read
         through the staircase pattern on the page behind it. -->
    <div class="section-box is-plain hero-box">
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
  </section>
</template>

<style scoped>
.services-hero {
  padding: 40px 0 20px;
}

.hero-box {
  padding-top: 56px;
  padding-bottom: 56px;
}

.hero-box h1 {
  max-width: 900px;

  margin: 0;

  color: var(--ink);

  font-size: clamp(46px, 6vw, 76px);
  font-weight: 700;

  line-height: 0.98;
  letter-spacing: -0.03em;
}

.hero-box h1 span {
  display: block;

  color: var(--accent);
}

.hero-box p {
  max-width: 700px;

  margin: 30px 0 0;

  color: var(--ink-soft);

  font-size: 17px;
  line-height: 1.7;
}

@media (max-width: 850px) {
  .services-hero {
    padding: 20px 0 12px;
  }

  .hero-box {
    padding-top: 34px;
    padding-bottom: 34px;
  }

  .hero-box h1 {
    font-size: clamp(40px, 13vw, 60px);
  }

  .hero-box p {
    font-size: 15px;
  }
}
</style>
