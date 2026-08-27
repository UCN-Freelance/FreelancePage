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

// --- intro sequence -----------------------------------------------
// Logo, then roster. Nothing travels across the screen: the mark holds,
// dissolves, and the members fade up one after another in their final
// grid positions. There is no separate carousel stage any more, so a
// member is only ever drawn once, in the place it ends up.
//
// Deliberately self-contained rather than routed through the shared
// html.js scroll-reveal system: this section nests deep enough that
// its onMounted can run before the app root's (Vue mounts children
// before parents), so relying on that global gate is fragile here.
// Everything below is visible by default and only ever hidden by JS
// that has actually run, so a slow/failed mount can never leave
// content stuck invisible.

// How long the mark sits on screen before it starts to go.
const LOGO_HOLD_MS = 900

// Must match the .stage-logo transition — it's fed to the CSS as
// --logo-fade-ms, so changing it here is enough.
const LOGO_FADE_MS = 420

// Gap between one member arriving and the next being cued. Fed to the
// CSS as --member-stagger so the delays can't drift from this number.
const MEMBER_STAGGER_MS = 120

const showLogo = ref(false)
const logoGone = ref(false)
const stageDone = ref(false)
const gridBuilt = ref(false)

const stageEl = ref<HTMLElement | null>(null)

const timers: number[] = []
let observer: IntersectionObserver | undefined

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    gridBuilt.value = true
    return
  }

  showLogo.value = true

  function runSequence() {
    timers.push(
      window.setTimeout(() => {
        logoGone.value = true
      }, LOGO_HOLD_MS),
    )

    // The roster starts arriving as the mark finishes dissolving, and the
    // stage collapses at the same moment — the members are already in
    // their own grid rows, so nothing has to wait for the space above to
    // finish closing.
    timers.push(
      window.setTimeout(() => {
        stageDone.value = true
        gridBuilt.value = true
      }, LOGO_HOLD_MS + LOGO_FADE_MS),
    )
  }

  requestAnimationFrame(() => {
    const stage = stageEl.value
    if (!stage) {
      // No stage element means no intro to run; show the roster rather
      // than leaving it hidden behind a sequence that will never fire.
      gridBuilt.value = true
      return
    }

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
})

onUnmounted(() => {
  timers.forEach((t) => window.clearTimeout(t))
  observer?.disconnect()
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

    <!-- Same .section-box panel (main.css) the other grids sit in. -->
    <div class="section-box team-band">
      <!-- Opens on the mark, then dissolves. Height is animated to zero so
           the roster below rises into the space rather than the page
           jumping when it goes. -->
      <div
        v-if="showLogo"
        ref="stageEl"
        class="team-stage"
        :class="{ 'is-done': stageDone }"
        aria-hidden="true"
      >
        <img
          class="stage-logo"
          :class="{ 'is-gone': logoGone }"
          :style="{ '--logo-fade-ms': `${LOGO_FADE_MS}ms` }"
          src="/LogoNextStep.png"
          alt=""
        >
      </div>

      <!-- No inner .team-container here: .section-box already constrains
           the width and adds the padding, so nesting one would inset the
           roster a second time. -->
      <div>
        <div
          class="team-grid"
          :class="{ 'js-enhanced': showLogo, 'is-built': gridBuilt }"
          :style="{ '--member-stagger': `${MEMBER_STAGGER_MS}ms` }"
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
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 84px 0 0;
}

.team-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  margin-bottom: 56px;
}

.section-kicker {
  display: block;

  margin-bottom: 22px;

  /* Accent rather than grey — this page had the least colour on it of
     any, and the kicker is the first thing read. */
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;

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
  color: var(--accent);
}

.section-heading p {
  max-width: 590px;

  margin: 26px 0 0;

  color: var(--ink-soft);

  font-size: 16px;
  line-height: 1.7;
}

/* =========================
   BAND
   ========================= */

/* Sizing, colour and radius all come from .section-box; this only adds
   what is specific to the roster. */
.team-band {
  margin-bottom: 40px;
}

/* =========================
   LOGO STAGE
   ========================= */

.team-stage {
  position: relative;

  height: 260px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  opacity: 1;

  /* `height` is the property that actually changes, so it's the one that
     has to be transitioned — a `max-height: 0` alongside it would clamp
     instantly and cut the collapse short no matter what this list says. */
  transition:
    opacity 360ms ease,
    height 520ms cubic-bezier(0.4, 0, 0.2, 1),
    margin-bottom 520ms cubic-bezier(0.4, 0, 0.2, 1);

  margin-bottom: 56px;
}

.team-stage.is-done {
  height: 0;
  margin-bottom: 0;

  opacity: 0;

  pointer-events: none;
}

.stage-logo {
  width: min(420px, 62vw);

  opacity: 1;
  pointer-events: none;

  /* Duration comes from LOGO_FADE_MS in the script, so the JS that
     schedules the roster can't drift out of sync with it. */
  transition:
    opacity var(--logo-fade-ms, 420ms) ease,
    transform var(--logo-fade-ms, 420ms) ease;
}

/* A slight contraction on the way out — a straight fade reads as a
   dropped frame, a shrink reads as a dissolve. */
.stage-logo.is-gone {
  transform: scale(0.94);

  opacity: 0;
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
   roster stuck invisible. A short rise rather than a slide from the
   side: they arrive in place, one after another.

   `transition: none` here is deliberate. A transition declared on the
   hidden state also animates the way *into* it, so the roster faded out
   over half a second on mount before it could fade back in. Declaring
   the duration only on .is-built means the hide is instantaneous and
   only the reveal animates. */
.team-grid.js-enhanced :deep(.team-card) {
  opacity: 0;
  transform: translateY(18px);

  transition: none;
}

.team-grid.js-enhanced.is-built :deep(.team-card) {
  opacity: 1;
  transform: none;

  transition:
    opacity 520ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Delays are multiples of --member-stagger, which the script sets from
   MEMBER_STAGGER_MS — one member every stagger, in reading order across
   both rows. */
.team-grid.js-enhanced.is-built .team-row:nth-child(1) :deep(.team-card:nth-child(1)) {
  transition-delay: calc(var(--member-stagger) * 0);
}
.team-grid.js-enhanced.is-built .team-row:nth-child(1) :deep(.team-card:nth-child(2)) {
  transition-delay: calc(var(--member-stagger) * 1);
}
.team-grid.js-enhanced.is-built .team-row:nth-child(1) :deep(.team-card:nth-child(3)) {
  transition-delay: calc(var(--member-stagger) * 2);
}
.team-grid.js-enhanced.is-built .team-row:nth-child(2) :deep(.team-card:nth-child(1)) {
  transition-delay: calc(var(--member-stagger) * 3);
}
.team-grid.js-enhanced.is-built .team-row:nth-child(2) :deep(.team-card:nth-child(2)) {
  transition-delay: calc(var(--member-stagger) * 4);
}
.team-grid.js-enhanced.is-built .team-row:nth-child(2) :deep(.team-card:nth-child(3)) {
  transition-delay: calc(var(--member-stagger) * 5);
}
.team-grid.js-enhanced.is-built .team-row:nth-child(2) :deep(.team-card:nth-child(4)) {
  transition-delay: calc(var(--member-stagger) * 6);
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
    padding: 56px 0 0;
  }

  .team-container {
    padding: 0 18px;
  }

  .section-header {
    margin-bottom: 40px;
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

  .team-band {
    margin-bottom: 28px;
  }

  .team-stage {
    height: 170px;

    margin-bottom: 36px;
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
