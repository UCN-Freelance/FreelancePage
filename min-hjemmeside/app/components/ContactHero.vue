<template>
  <section class="contact-hero">
    <div class="hero-container">
      <div class="hero-copy">
        <span class="hero-label">Kontakt</span>

        <h1>
          Har du en idé?
          <span>Lad os tale om den.</span>
        </h1>

        <p>
          Fortæl os lidt om dit projekt, udfordringen eller den idé, du går med.
          Vi vender tilbage og finder sammen ud af, hvordan vi bedst kan hjælpe.
        </p>

        <a href="mailto:10643799@ucn.dk" class="contact-email">
          <span class="email-label">Skriv til os</span>
          10643799@ucn.dk
        </a>
      </div>

      <div class="hero-decoration" aria-hidden="true">
        <div class="decoration-circle">
          <svg viewBox="0 0 48 48" fill="none">
            <path
              d="M12 24h24M28 16l8 8-8 8"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <p>Vi svarer typisk<br>inden for 1-2 hverdage.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-hero {
  padding: 64px 24px 100px;
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
  max-width: 780px;
}

.hero-label {
  display: block;

  margin-bottom: 22px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 13px;
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
  max-width: 620px;

  margin: 30px 0 0;

  color: var(--ink-soft);

  font-size: 17px;
  line-height: 1.7;
}

.contact-email {
  display: inline-flex;
  flex-direction: column;

  gap: 6px;

  margin-top: 40px;
  padding: 20px 24px;

  border: 1px solid var(--line-strong);

  color: var(--ink);

  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 500;

  text-decoration: none;

  transition:
    background 180ms ease,
    border-color 180ms ease;
}

.contact-email:hover {
  border-color: var(--accent);
  background: rgba(127, 127, 127, 0.08);
}

.email-label {
  color: var(--slate);

  font-size: 13px;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero-decoration {
  width: 180px;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 16px;

  color: var(--slate);

  text-align: right;

  font-size: 14px;
  line-height: 1.5;
}

.decoration-circle {
  width: 56px;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--line-strong);

  color: var(--accent);
}

.decoration-circle svg {
  width: 22px;
  height: 22px;
}

@media (max-width: 800px) {
  .contact-hero {
    padding: 50px 18px 70px;
  }

  .hero-container {
    display: block;
  }

  .hero-decoration {
    display: none;
  }

  .hero-copy h1 {
    font-size: clamp(40px, 13vw, 60px);
  }

  .hero-copy p {
    font-size: 15px;
  }

  .contact-email {
    width: 100%;

    font-size: 15px;
  }
}
</style>
