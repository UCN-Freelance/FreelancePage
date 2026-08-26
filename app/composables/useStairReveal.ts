import { onMounted, type Ref } from 'vue'

export type RevealDirection = 'up' | 'left' | 'right'

interface RevealOptions {
  staggerMs?: number
  /** Fixed direction for every item, or a function of its index for
   * per-item variety (e.g. alternate by column, converge from both sides). */
  direction?: RevealDirection | ((index: number) => RevealDirection)
}

/** Entrance transition duration, matching html.js .reveal-item in main.css. */
const REVEAL_MS = 560

/**
 * The stagger is an inline transition-delay, so it applies to every later
 * transition on the element too — a hover on the last item would sit idle
 * for the whole stagger before responding. Drop it once the item has landed.
 */
function clearStaggerWhenLanded(el: HTMLElement) {
  const delay = Number.parseFloat(el.style.transitionDelay) || 0

  window.setTimeout(() => {
    el.style.transitionDelay = ''
  }, delay + REVEAL_MS)
}

/**
 * Reveals items inside a container one after another as they scroll into
 * view — each item is the "next step". Direction defaults to rising up
 * from below; pass `direction` to bring items in from the side instead.
 */
export function useStairReveal(
  containerRef: Ref<HTMLElement | null>,
  itemSelector: string,
  options: RevealOptions = {},
) {
  const { staggerMs = 70, direction = 'up' } = options

  onMounted(() => {
    const container = containerRef.value
    if (!container) return

    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector))
    if (!items.length) return

    items.forEach((el, i) => {
      const dir = typeof direction === 'function' ? direction(i) : direction

      el.classList.add('reveal-item')
      if (dir !== 'up') el.classList.add(`reveal-${dir}`)
      el.style.transitionDelay = `${i * staggerMs}ms`
    })

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => {
        el.classList.add('is-visible')
        clearStaggerWhenLanded(el)
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement

            el.classList.add('is-visible')
            clearStaggerWhenLanded(el)
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    items.forEach((el) => observer.observe(el))
  })
}
