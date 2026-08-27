<script setup lang="ts">
import { onUnmounted } from 'vue'
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

/**
 * A road receding to the horizon — the "next step" the company is named
 * for, taken literally: scrolling the page moves you forward along it.
 *
 * Built as one plain THREE.Group rather than as Tres components because
 * the dash markings need their per-frame opacity written directly, and
 * a group hands the whole thing to the canvas in a single primitive.
 *
 * Motion is a pure function of scroll position. There is no idle drift:
 * a road that advances on its own would pull the eye on a page that
 * isn't moving, which is the opposite of ambient.
 */

const ACCENT = '#6366f1'

// How far the road appears to travel across a full page of scrolling.
// Roughly four dash-cycles, so a long page reads as real distance
// covered rather than a nudge.
const TRAVEL = 76

const DASH_COUNT = 26
const DASH_SPACING = 4.4
const CYCLE = DASH_COUNT * DASH_SPACING

// Where the road passes out of sight. Everything fades to nothing by
// here, which is what stands in for a horizon — there is no fog on the
// scene, so the fade has to be written onto the materials.
const FADE_START = 18
const FADE_END = 96

const disposables: Array<{ dispose: () => void }> = []

function track<T extends { dispose: () => void }>(resource: T) {
  disposables.push(resource)
  return resource
}

const road = new THREE.Group()

// Sunk below the camera and pushed back, so the surface is seen at a
// shallow angle and converges near the vertical middle of the frame.
road.position.set(0, -2.4, 0)

// --- surface -------------------------------------------------------
const surface = new THREE.Mesh(
  track(new THREE.PlaneGeometry(16, FADE_END * 2)),
  track(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(ACCENT),
      transparent: true,
      opacity: 0.035,
      depthWrite: false,
    }),
  ),
)
surface.rotation.x = -Math.PI / 2
surface.position.z = -FADE_END / 2
road.add(surface)

// --- edge lines ----------------------------------------------------
// The two rails that give the perspective its convergence; without them
// the dashes alone read as a floating dotted line rather than a road.
function makeEdge(x: number) {
  const edge = new THREE.Mesh(
    track(new THREE.PlaneGeometry(0.07, FADE_END * 2)),
    track(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(ACCENT),
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      }),
    ),
  )

  edge.rotation.x = -Math.PI / 2
  edge.position.set(x, 0.01, -FADE_END / 2)

  return edge
}

road.add(makeEdge(-4.6), makeEdge(4.6))

// --- centre dashes -------------------------------------------------
// These are the only things that actually move. Each one runs toward the
// camera and wraps back to the far end, so a fixed set of 26 reads as an
// endless road.
const dashes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = []

for (let i = 0; i < DASH_COUNT; i++) {
  const dash = new THREE.Mesh(
    track(new THREE.PlaneGeometry(0.14, 2.1)),
    track(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(ACCENT),
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    ),
  )

  dash.rotation.x = -Math.PI / 2
  dash.position.set(0, 0.02, 0)

  dashes.push(dash)
  road.add(dash)
}

// --- per-frame -----------------------------------------------------
const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0

  const travel = progress * TRAVEL

  for (let i = 0; i < dashes.length; i++) {
    const dash = dashes[i]!

    // Start each dash a fixed distance down the road, advance them all by
    // the scroll travel, then wrap within one cycle so the sequence is
    // seamless however far the page has been scrolled.
    const z = -CYCLE + (((i * DASH_SPACING + travel) % CYCLE) + CYCLE) % CYCLE

    dash.position.z = z

    // Distance from the camera, which sits at z = 8 in front of the group.
    const distance = Math.abs(z - 8)
    const fade = 1 - Math.min(1, Math.max(0, (distance - FADE_START) / (FADE_END - FADE_START)))

    dash.material.opacity = 0.34 * fade
  }
})

onUnmounted(() => {
  disposables.forEach((resource) => resource.dispose())
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 8]" :fov="45" make-default />

  <TresAmbientLight :intensity="0.6" color="#1e293b" />

  <primitive :object="road" />
</template>
