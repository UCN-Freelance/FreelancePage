<template>
  <section class="services-cta">
    <div class="cta-container">
      <div class="cta-card">
        <div class="cta-copy">
          <span>
            Har I noget andet i tankerne?
          </span>

          <h2>
            Ikke alle projekter
            <strong>passer i en kategori.</strong>
          </h2>

          <p>
            Har I en idé, et problem eller et eksisterende system, der skal
            forbedres, så tag fat i os. Vi finder ud af, hvad der giver mening.
          </p>
        </div>

        <NuxtLink
          to="/contact"
          class="cta-button"
        >
          <span>
            Kontakt os
          </span>

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
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-cta {
  padding: 100px 24px 120px;

  background: #f8f9fb;
}

.cta-container {
  max-width: 1240px;

  margin: 0 auto;
}

.cta-card {
  min-height: 410px;

  padding: 58px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 60px;

  border: 1px solid rgba(17, 21, 32, 0.07);
  border-radius: 30px;

  background:
    radial-gradient(
      circle at 92% 12%,
      rgba(36, 108, 255, 0.11),
      transparent 35%
    ),
    white;

  box-shadow:
    0 18px 60px rgba(18, 22, 33, 0.05);
}

.cta-copy {
  max-width: 760px;
}

.cta-copy > span {
  display: block;

  margin-bottom: 20px;

  color: #858b96;

  font-size: 10px;
  font-weight: 650;

  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.cta-copy h2 {
  margin: 0;

  color: #111520;

  font-size: clamp(46px, 5vw, 70px);
  font-weight: 650;

  line-height: 0.95;
  letter-spacing: -0.06em;
}

.cta-copy h2 strong {
  display: block;

  color: #a1a6af;

  font-weight: inherit;
}

.cta-copy p {
  max-width: 580px;

  margin: 25px 0 0;

  color: #6c727d;

  font-size: 14px;
  line-height: 1.75;
}

.cta-button {
  height: 54px;

  flex-shrink: 0;

  padding: 0 20px;

  display: inline-flex;
  align-items: center;

  gap: 10px;

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

.cta-button svg {
  width: 19px;
  height: 19px;

  transition: transform 180ms ease;
}

.cta-button:hover {
  transform: translateY(-2px);

  background: #202634;

  box-shadow:
    0 12px 28px rgba(17, 21, 32, 0.18);
}

.cta-button:hover svg {
  transform: translateX(3px);
}

@media (max-width: 750px) {
  .services-cta {
    padding: 70px 18px 90px;
  }

  .cta-card {
    min-height: auto;

    padding: 34px;

    flex-direction: column;
    align-items: flex-start;

    gap: 35px;

    border-radius: 24px;
  }
}

@media (max-width: 480px) {
  .cta-card {
    padding: 28px;
  }

  .cta-button {
    width: 100%;

    justify-content: center;
  }
}
</style>