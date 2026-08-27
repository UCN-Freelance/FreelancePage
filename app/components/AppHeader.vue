<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'Ydelser', to: '/services' },
  { label: 'Cases', to: '/cases' },
  { label: 'Om os', to: '/about' },
]
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="brand"
        aria-label="Next Step Freelance - Forside"
      >
        <img
          src="/LogoNextStepMini.png"
          alt="Next Step Freelance"
          class="brand-logo"
        />
        <span class="brand-name">Next&nbsp;Step</span>
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="desktop-nav" aria-label="Primær navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="nav-link"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Desktop actions -->
      <div class="header-actions">
        <NuxtLink to="/contact" class="cta-button">
          <span>Kontakt os</span>

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

        <button
          class="menu-button"
          type="button"
          aria-label="Åbn menu"
          :aria-expanded="mobileMenuOpen"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span :class="{ active: mobileMenuOpen }" />
          <span :class="{ active: mobileMenuOpen }" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu">
      <div
        v-if="mobileMenuOpen"
        class="mobile-menu"
      >
        <nav class="mobile-nav">
          <NuxtLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="mobile-contact"
            @click="mobileMenuOpen = false"
          >
            Kontakt os
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;

  background: var(--bg);
  border-bottom: 1px solid var(--line);
}

.header-inner {
  max-width: 1280px;
  height: 76px;

  margin: 0 auto;
  padding: 0 24px;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

/* =========================
   LOGO
   ========================= */

.brand {
  justify-self: start;

  display: flex;
  align-items: center;
  gap: 10px;

  text-decoration: none;
}

.brand-logo {
  width: 32px;
  height: 32px;

  display: block;

  object-fit: contain;
  flex-shrink: 0;
}

.brand-name {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;

  color: var(--ink);
}

/* =========================
   DESKTOP NAV
   ========================= */

.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 4px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  padding: 9px 14px;

  border-radius: var(--radius-sm);

  color: var(--ink-soft);

  font-size: 15px;
  font-weight: 500;

  text-decoration: none;

  transition:
    color 160ms ease,
    background 160ms ease;
}

.nav-link:hover {
  color: var(--ink);
  background: rgba(127, 127, 127, 0.12);
}

.nav-link.router-link-active {
  color: var(--accent);
}

/* =========================
   RIGHT SIDE
   ========================= */

.header-actions {
  justify-self: end;

  display: flex;
  align-items: center;

  gap: 8px;
}

/* =========================
   CTA
   ========================= */

.cta-button {
  height: 42px;

  padding: 0 16px;

  display: inline-flex;
  align-items: center;

  gap: 9px;

  border-radius: var(--radius-sm);

  background: var(--chip-bg);
  color: var(--chip-text);

  font-size: 15px;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 160ms ease,
    color 160ms ease;
}

.cta-button svg {
  width: 16px;
  height: 16px;

  flex-shrink: 0;

  transition: transform 160ms ease;
}

.cta-button:hover {
  background: var(--accent);
  color: var(--accent-ink);
}

.cta-button:hover svg {
  transform: translateX(2px);
}

/* =========================
   MOBILE BUTTON
   ========================= */

.menu-button {
  width: 42px;
  height: 42px;

  display: none;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 5px;

  border: 1px solid var(--line);
  border-radius: var(--radius-sm);

  background: transparent;

  cursor: pointer;
}

.menu-button span {
  width: 18px;
  height: 1.5px;

  display: block;

  background: var(--ink);

  transition:
    transform 180ms ease,
    opacity 180ms ease;
}

.menu-button span:first-child.active {
  transform: translateY(3.25px) rotate(45deg);
}

.menu-button span:last-child.active {
  transform: translateY(-3.25px) rotate(-45deg);
}

/* =========================
   MOBILE MENU
   ========================= */

.mobile-menu {
  padding: 8px 24px 18px;

  border-top: 1px solid var(--line);
  background: var(--bg);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav a {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 15px 4px;

  border-bottom: 1px solid var(--line);

  color: var(--ink-soft);

  font-size: 15px;
  font-weight: 500;

  text-decoration: none;
}

.mobile-nav .mobile-contact {
  margin-top: 14px;

  justify-content: center;

  padding: 13px 4px;

  border: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  border-radius: var(--radius-sm);

  color: var(--ink);
  font-weight: 600;
}

/* =========================
   MOBILE MENU ANIMATION
   ========================= */

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* =========================
   TABLET / MOBILE
   ========================= */

@media (max-width: 850px) {
  .header-inner {
    height: 64px;

    padding: 0 18px;

    grid-template-columns: 1fr auto;
  }

  .desktop-nav,
  .cta-button {
    display: none;
  }

  .menu-button {
    display: flex;
  }

  .brand-name {
    display: none;
  }
}
</style>
