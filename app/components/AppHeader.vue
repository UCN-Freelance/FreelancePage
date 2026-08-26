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
        aria-label="UCN Freelance - Forside"
      >
        <img
          src="/LogoUCNFreelanceMini.png"
          alt="UCN Freelance"
          class="brand-logo"
        />
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

  padding: 18px 24px;

  background:
    linear-gradient(
      to bottom,
      rgba(248, 249, 251, 0.92),
      rgba(248, 249, 251, 0.76)
    );

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

/* =========================
   HEADER BAR
   ========================= */

.header-inner {
  max-width: 1240px;
  height: 72px;

  margin: 0 auto;
  padding: 0 14px 0 18px;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  border: 1px solid rgba(18, 22, 33, 0.08);
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.78);

  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.02),
    0 8px 30px rgba(20, 25, 40, 0.05);
}

/* =========================
   LOGO
   ========================= */

.brand {
  justify-self: start;

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  overflow: hidden;

  text-decoration: none;
}

.brand-logo {
  width: 42px;
  height: 42px;

  max-width: 42px;
  max-height: 42px;

  display: block;

  object-fit: contain;

  flex-shrink: 0;
}

/* =========================
   DESKTOP NAV
   ========================= */

.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 6px;
}

.nav-link {
  padding: 10px 14px;

  border-radius: 10px;

  color: #626876;

  font-size: 14px;
  font-weight: 500;

  text-decoration: none;

  transition:
    color 160ms ease,
    background 160ms ease;
}

.nav-link:hover {
  color: #111520;
  background: #f3f5f7;
}

/* Active Nuxt route */
.nav-link.router-link-active {
  color: #111520;
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
  height: 44px;

  padding: 0 17px;

  display: inline-flex;
  align-items: center;

  gap: 9px;

  border-radius: 12px;

  background: #111520;
  color: white;

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;

  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    0 6px 18px rgba(17, 21, 32, 0.14);

  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;
}

.cta-button svg {
  width: 18px;
  height: 18px;

  flex-shrink: 0;

  transition: transform 160ms ease;
}

.cta-button:hover {
  transform: translateY(-1px);

  background: #202634;

  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    0 9px 24px rgba(17, 21, 32, 0.18);
}

.cta-button:hover svg {
  transform: translateX(2px);
}

/* =========================
   MOBILE BUTTON
   ========================= */

.menu-button {
  width: 44px;
  height: 44px;

  display: none;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 5px;

  border: 0;
  border-radius: 12px;

  background: #f2f4f6;

  cursor: pointer;
}

.menu-button span {
  width: 18px;
  height: 1.5px;

  display: block;

  background: #171b24;

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
  max-width: 1240px;

  margin: 8px auto 0;
  padding: 12px;

  border: 1px solid rgba(18, 22, 33, 0.08);
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.96);

  box-shadow:
    0 15px 40px rgba(20, 25, 40, 0.08);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav a {
  padding: 15px 16px;

  border-radius: 12px;

  color: #454b59;

  font-size: 15px;
  font-weight: 500;

  text-decoration: none;

  transition:
    color 160ms ease,
    background 160ms ease;
}

.mobile-nav a:hover {
  background: #f4f5f7;
  color: #111520;
}

.mobile-nav .mobile-contact {
  margin-top: 8px;

  background: #111520;
  color: white;

  text-align: center;
}

.mobile-nav .mobile-contact:hover {
  background: #202634;
  color: white;
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
  .site-header {
    padding: 12px;
  }

  .header-inner {
    height: 64px;

    padding: 0 10px 0 12px;

    grid-template-columns: 1fr auto;
  }

  .desktop-nav,
  .cta-button {
    display: none;
  }

  .menu-button {
    display: flex;
  }

  .brand {
    width: 44px;
    height: 44px;
  }

  .brand-logo {
    width: 38px;
    height: 38px;

    max-width: 38px;
    max-height: 38px;
  }
}
</style>