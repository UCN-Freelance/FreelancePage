<template>
  <section class="contact-hero">
    <div class="hero-container">
      <div class="hero-copy">
        <span class="hero-label">
          Kontakt
        </span>

        <h1>
          Har du en idé?
          <span>Lad os tale om den.</span>
        </h1>

        <p>
          Fortæl os lidt om dit projekt, udfordringen eller den idé, du går med.
          Vi vender tilbage og finder sammen ud af, hvordan vi bedst kan hjælpe.
        </p>

        <h3>Kontakt os på
            10643799@ucn.dk
        </h3>
      </div>

      <div class="hero-decoration">
        <div class="decoration-circle">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 24h24M28 16l8 8-8 8"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-hero {
  padding: 110px 24px 90px;
  background: #f8f9fb;
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
  max-width: 850px;
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
  max-width: 650px;

  margin: 34px 0 0;

  color: #676d78;

  font-size: 17px;
  line-height: 1.75;
}

.hero-decoration {
  width: 180px;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 14px;

  color: #808691;

  text-align: right;

  font-size: 11px;
  line-height: 1.5;
}


@media (max-width: 800px) {
  .contact-hero {
    padding: 80px 18px 65px;
  }

  .hero-container {
    display: block;
  }

  .hero-decoration {
    display: none;
  }

  .hero-copy h1 {
    font-size: clamp(52px, 14vw, 76px);
  }

  .hero-copy p {
    font-size: 15px;
  }
}
</style>