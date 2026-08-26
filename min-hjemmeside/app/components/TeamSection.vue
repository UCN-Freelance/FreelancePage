<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const teamMembers = [
  {
    name: 'Omid Zahidi',
    title: 'Projekt Ansvarlig',
    secondaryTitle: 'Software Developer',
  },
  {
    name: 'Mozamel Bakshi',
    title: 'Account Manager',
    secondaryTitle: 'Software Developer',
  },
  {
    name: 'Oliver Olsen',
    title: 'Økonomi Ansvarlig',
    secondaryTitle: 'Software Developer',
  },
  {
    name: 'Patrick Bech',
    title: 'Software Developer',
  },
  {
    name: 'Frederik Pedersen',
    title: 'Software Developer',
  },
  {
    name: 'Peter Løth',
    title: 'Software Developer',
  },
  {
    name: 'Magnus Germundsson',
    title: 'Software Developer',
  },
]

// A card is "fixed" the moment a member is added above — the photo
// itself is optional. Drop `<FirstName>.jpg` into public/team/ (e.g.
// public/team/Omid.jpg) and it appears automatically; until then the
// card shows the person's initials.
function imagePath(name: string) {
  return `/team/${name.split(' ')[0]}.jpg`
}

// --- spotlight stage -> auto-build sequence ------------------------
// One member shown at a time, cycling on its own once the section is
// scrolled into view (no scroll-scrubbing involved), then the stage
// hands off to the full roster grid, which builds in card by card.
//
// Deliberately self-contained rather than routed through the shared
// html.js scroll-reveal system: this section nests deep enough that
// its onMounted can run before the app root's (Vue mounts children
// before parents), so relying on that global gate is fragile here.
// Everything below is visible by default and only ever hidden by JS
// that has actually run, so a slow/failed mount can never leave
// content stuck invisible.
const HOLD_MS = 1100

const showStage = ref(false)
const activeIndex = ref(0)
const stageDone = ref(false)
const gridBuilt = ref(false)

const stageEl = ref<HTMLElement | null>(null)
const gridEl = ref<HTMLElement | null>(null)

const timers: number[] = []
let observer: IntersectionObserver | undefined
let measureFn: (() => void) | undefined
let scrollLocked = false

// Scrolling fast enough could carry someone straight past the stage
// before the sequence even starts — lock the page in place for its
// duration so it can't be missed, then hand scrolling back.
function lockScroll() {
  if (scrollLocked) return
  scrollLocked = true

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
}

function unlockScroll() {
  if (!scrollLocked) return
  scrollLocked = false

  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tooNarrow = window.innerWidth < 900
  if (prefersReducedMotion || tooNarrow) {
    gridBuilt.value = true
    return
  }

  showStage.value = true

  function measure() {
    const stage = stageEl.value
    if (!stage) return

    const header = document.querySelector<HTMLElement>('.site-header')
    const headerHeight = header?.getBoundingClientRect().height ?? 0

    const available = window.innerHeight - headerHeight
    const stageHeight = Math.max(420, Math.min(available - 32, 560))

    stage.style.setProperty('--stage-h', `${stageHeight}px`)
  }

  function runSequence() {
    lockScroll()

    teamMembers.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          activeIndex.value = i
        }, i * HOLD_MS),
      )
    })

    timers.push(
      window.setTimeout(
        () => {
          stageDone.value = true
          gridBuilt.value = true
          unlockScroll()
        },
        teamMembers.length * HOLD_MS,
      ),
    )
  }

  requestAnimationFrame(() => {
    measure()

    const stage = stageEl.value
    if (!stage) return

    // Wait until the stage is substantially in view (not just peeking
    // in at the edge) before locking — that way the lock lands on a
    // reasonably centered, already-legible view rather than an
    // awkward half-scrolled one.
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runSequence()
            observer?.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(stage)
  })

  measureFn = measure
  window.addEventListener('resize', measure)
})

onUnmounted(() => {
  timers.forEach((t) => window.clearTimeout(t))
  observer?.disconnect()
  if (measureFn) window.removeEventListener('resize', measureFn)
  unlockScroll()
})
</script>

<template>
  <section class="team-section">
    <div class="team-container">
      <div class="section-header">
        <span class="section-kicker">Om os</span>

        <div class="section-heading">
          <h2>
            <span class="heading-primary">Syv udviklere.</span>
            <span class="heading-secondary">Ét samlet team.</span>
          </h2>

          <p>
            Vi kombinerer softwareudvikling, design og teknisk erfaring
            for at bygge løsninger, der både fungerer og føles rigtige.
          </p>
        </div>
      </div>
    </div>

    <!-- one member at a time, cycling on its own -->
    <div
      v-if="showStage"
      ref="stageEl"
      class="team-stage"
      :class="{ 'is-done': stageDone }"
    >
      <div
        v-for="(member, index) in teamMembers"
        :key="member.name"
        class="stage-card"
        :class="{
          'is-active': index === activeIndex,
          'is-exited': index < activeIndex,
        }"
      >
        <TeamMemberCard
          :name="member.name"
          :title="member.title"
          :secondary-title="member.secondaryTitle"
          :image="imagePath(member.name)"
        />
      </div>
    </div>

    <!-- everyone, built in -->
    <div class="team-container">
      <div
        ref="gridEl"
        class="team-grid"
        :class="{ 'js-enhanced': showStage, 'is-built': gridBuilt }"
      >
        <div class="team-row">
          <TeamMemberCard
            v-for="member in teamMembers.slice(0, 3)"
            :key="member.name"
            :name="member.name"
            :title="member.title"
            :secondary-title="member.secondaryTitle"
            :image="imagePath(member.name)"
          />
        </div>

        <div class="team-row">
          <TeamMemberCard
            v-for="member in teamMembers.slice(3)"
            :key="member.name"
            :name="member.name"
            :title="member.title"
            :secondary-title="member.secondaryTitle"
            :image="imagePath(member.name)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 64px 0 110px;

  background: var(--bg);
}

.team-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  margin-bottom: 60px;
}

.section-kicker {
  display: block;

  margin-bottom: 22px;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.section-heading {
  max-width: 820px;
}

.section-heading h2 {
  margin: 0;

  color: var(--ink);

  font-size: clamp(36px, 4.4vw, 56px);
  font-weight: 700;

  line-height: 1.04;
  letter-spacing: -0.02em;
}

.heading-primary,
.heading-secondary {
  display: block;
}

.heading-primary {
  color: var(--ink);
}

.heading-secondary {
  color: var(--slate);
}

.section-heading p {
  max-width: 590px;

  margin: 26px 0 0;

  color: var(--ink-soft);

  font-size: 16px;
  line-height: 1.7;
}

/* =========================
   STAGE — one member at a time
   ========================= */

.team-stage {
  position: relative;

  /* Set from JS (measure() in the script) to the space actually left
     below the sticky header, so the card and its name/title never run
     out of room and get clipped. */
  height: var(--stage-h, 560px);

  margin-bottom: 130px;

  overflow: hidden;

  opacity: 1;

  transition:
    opacity 500ms ease,
    max-height 600ms ease,
    margin-bottom 600ms ease;
}

.team-stage.is-done {
  height: 0;
  max-height: 0;
  margin-bottom: 0;

  opacity: 0;

  pointer-events: none;
}

.stage-card {
  position: absolute;
  top: 50%;
  left: 50%;

  /* Image is 4:5, so height ≈ width × 1.25; reserve ~130px under it
     for the name/title block and keep the whole card inside the
     stage's own height regardless of how short the viewport is. */
  width: min(340px, calc((var(--stage-h, 560px) - 130px) / 1.25));

  /* Default (not yet shown) sits off to the right, waiting to swipe
     in; .is-exited moves it past center to the left instead of just
     back where it came from, so the outgoing and incoming card read
     as one continuous rightward conveyor rather than a retreat. */
  transform: translate(-50%, -50%) translateX(90px);

  opacity: 0;
  pointer-events: none;

  transition:
    opacity 700ms ease,
    transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.stage-card.is-exited {
  transform: translate(-50%, -50%) translateX(-90px);
}

.stage-card.is-active {
  transform: translate(-50%, -50%) translateX(0);

  opacity: 1;
  pointer-events: auto;
}

.stage-card :deep(.member-info) {
  justify-content: center;

  text-align: center;
}

/* =========================
   FULL ROSTER GRID
   ========================= */

/* The roster order is deliberate: the first three team members carry a
   role beyond "Software Developer", so they lead their own centered
   row; the remaining four fill a second row below. Every card is the
   same size regardless of row — size shouldn't imply seniority — so
   both rows share one card width, sized off a 4-per-row reference.
   The lead row's 3 cards don't fill that width, which is exactly what
   centers them; the dev row's 4 cards fill it exactly, so centering
   there is a no-op. */
.team-grid {
  display: flex;
  flex-direction: column;

  gap: 42px;
}

.team-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 22px;
}

.team-grid :deep(.team-card) {
  flex: 0 0 calc((100% - 3 * 22px) / 4);
}

/* Only ever hidden once JS has confirmed it's driving the sequence —
   default is fully visible, so a slow mount or no-JS never leaves the
   roster stuck invisible. */
.team-grid.js-enhanced :deep(.team-card) {
  opacity: 0;
  transform: translateX(60px);

  transition:
    opacity 560ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 560ms cubic-bezier(0.16, 1, 0.3, 1);
}

.team-grid.js-enhanced.is-built :deep(.team-card) {
  opacity: 1;
  transform: none;
}

.team-grid.js-enhanced .team-row:nth-child(1) :deep(.team-card:nth-child(1)) {
  transition-delay: 0ms;
}
.team-grid.js-enhanced .team-row:nth-child(1) :deep(.team-card:nth-child(2)) {
  transition-delay: 130ms;
}
.team-grid.js-enhanced .team-row:nth-child(1) :deep(.team-card:nth-child(3)) {
  transition-delay: 260ms;
}
.team-grid.js-enhanced .team-row:nth-child(2) :deep(.team-card:nth-child(1)) {
  transition-delay: 390ms;
}
.team-grid.js-enhanced .team-row:nth-child(2) :deep(.team-card:nth-child(2)) {
  transition-delay: 520ms;
}
.team-grid.js-enhanced .team-row:nth-child(2) :deep(.team-card:nth-child(3)) {
  transition-delay: 650ms;
}
.team-grid.js-enhanced .team-row:nth-child(2) :deep(.team-card:nth-child(4)) {
  transition-delay: 780ms;
}

/* =========================
   TABLET
   ========================= */

@media (max-width: 1000px) {
  .team-grid :deep(.team-card) {
    flex-basis: calc((100% - 2 * 22px) / 3);
  }
}

/* =========================
   MOBILE
   ========================= */

@media (max-width: 750px) {
  .team-section {
    padding: 80px 18px;
  }

  .section-header {
    margin-bottom: 44px;
  }

  .section-heading {
    max-width: 100%;
  }

  .section-heading h2 {
    font-size: clamp(40px, 11vw, 54px);
  }

  .section-heading p {
    margin-top: 22px;

    font-size: 15px;
    line-height: 1.65;
  }

  .team-grid {
    gap: 34px;
  }

  .team-row {
    gap: 14px;
  }

  .team-grid :deep(.team-card) {
    flex-basis: calc((100% - 1 * 14px) / 2);
  }
}

/* =========================
   SMALL MOBILE
   ========================= */

@media (max-width: 500px) {
  .team-grid :deep(.team-card) {
    flex-basis: 100%;
  }
}
</style>
