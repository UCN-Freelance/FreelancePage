import { onMounted, onUnmounted, type Ref } from 'vue'

interface TiltOptions {
  /** Maximum rotation at the corners, in degrees. */
  maxDeg?: number
}

/**
 * Tips a card toward the cursor as it moves across it, by writing
 * --tilt-x / --tilt-y onto the element. The transform itself is composed
 * in CSS alongside the existing hover lift and scale, so this only ever
 * contributes two rotations and never fights the rest of the hover state.
 *
 * Pointer-driven rather than CSS-only because the angle has to track
 * where the cursor actually is inside the card, which :hover can't know.
 */
export function useCardTilt(
  containerRef: Ref<HTMLElement | null>,
  itemSelector: string,
  options: TiltOptions = {},
) {
  const { maxDeg = 7 } = options

  let cleanups: Array<() => void> = []

  onMounted(() => {
    // A tilt that chases the cursor is exactly the kind of motion this
    // query exists to suppress, so opt out entirely rather than damping.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Coarse pointers have no hover to track, and on touch the handlers
    // would only fire mid-tap and leave the card stuck at an angle.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const container = containerRef.value
    if (!container) return

    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector))

    for (const el of items) {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()

        // -0.5..0.5 from the card's own centre.
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5

        // Y follows horizontal travel, X follows vertical, negated so the
        // card leans toward the cursor rather than away from it.
        el.style.setProperty('--tilt-y', `${px * maxDeg * 2}deg`)
        el.style.setProperty('--tilt-x', `${-py * maxDeg * 2}deg`)
      }

      const onLeave = () => {
        el.style.setProperty('--tilt-x', '0deg')
        el.style.setProperty('--tilt-y', '0deg')
      }

      el.addEventListener('pointermove', onMove, { passive: true })
      el.addEventListener('pointerleave', onLeave)

      cleanups.push(() => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      })
    }
  })

  onUnmounted(() => {
    for (const fn of cleanups) fn()
    cleanups = []
  })
}
