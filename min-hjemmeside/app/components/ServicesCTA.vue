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
  padding: 90px 24px 110px;

  background: var(--bg);
}

.cta-container {
  max-width: 1240px;

  margin: 0 auto;
}

.cta-card {
  min-height: 380px;

  padding: 56px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 60px;

  border: 1px solid var(--line-strong);
  background: var(--bg-raised);
}

.cta-copy {
  max-width: 760px;
}

.cta-copy > span {
  display: block;

  margin-bottom: 18px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 11px;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.cta-copy h2 {
  margin: 0;

  color: var(--ink);

  font-size: clamp(36px, 4.4vw, 56px);
  font-weight: 700;

  line-height: 1.02;
  letter-spacing: -0.02em;
}

.cta-copy h2 strong {
  display: block;

  color: var(--slate);

  font-weight: inherit;
}

.cta-copy p {
  max-width: 580px;

  margin: 22px 0 0;

  color: var(--ink-soft);

  font-size: 14px;
  line-height: 1.7;
}

.cta-button {
  height: 54px;

  flex-shrink: 0;

  padding: 0 20px;

  display: inline-flex;
  align-items: center;

  gap: 10px;

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

.cta-button svg {
  width: 19px;
  height: 19px;

  transition: transform 180ms ease;
}

.cta-button:hover {
  background: var(--accent);
  color: var(--accent-ink);
}

.cta-button:hover svg {
  transform: translateX(3px);
}

@media (max-width: 750px) {
  .services-cta {
    padding: 60px 18px 80px;
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
  .cta-button {
    width: 100%;

    justify-content: center;
  }
}
</style>