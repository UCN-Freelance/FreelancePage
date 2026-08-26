function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

/**
 * Decides whether to render the WebGL staircase or fall back to the
 * static CSS one. Checked once, client-side only, before anything 3D
 * is even imported — reduced motion, low core-count devices, small
 * screens (mobile battery/perf), and missing WebGL all fall back.
 */
export function useCanUse3D() {
  if (import.meta.server) return false

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lowPower = (navigator.hardwareConcurrency || 8) < 4
  const smallScreen = window.innerWidth < 700

  return !prefersReducedMotion && !lowPower && !smallScreen && hasWebGL()
}
