<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

/* Palette mirrors --accent / --warning in main.css. Hardcoded because
   WebGL materials can't read CSS custom properties — if the tokens move,
   these move with them. */
const LIME = new THREE.Color('#d2ff00')
const ORANGE = new THREE.Color('#ff6b00')

const cameraRef = shallowRef()
const solidA = shallowRef()
const solidB = shallowRef()
const solidC = shallowRef()

/* Everything built imperatively below is passed in via <primitive>
   rather than Tres components: BufferGeometry attributes and
   GridHelper's internal material are both awkward to express
   declaratively, and this keeps the disposal story in one place. */
const disposables: Array<{ dispose: () => void }> = []

/* --- drifting point field ------------------------------------------
   The main reason the scene reads as deep rather than as flat shapes
   on a backdrop. Additive blending is what makes the lime glow where
   points overlap instead of just stacking opacity. */
function makeField(count: number, spread: [number, number, number], size: number, opacity: number) {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread[0]
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread[1]
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread[2] - 6
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: LIME,
    size,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })

  disposables.push(geometry, material)

  return new THREE.Points(geometry, material)
}

const farField = makeField(700, [46, 30, 26], 0.03, 0.5)
const nearField = makeField(160, [26, 18, 12], 0.055, 0.75)

/* --- receding floor grid -------------------------------------------
   Sits well below the content and rakes away toward the horizon. The
   single strongest "this is a 3D space" cue in the scene. */
const grid = new THREE.GridHelper(90, 46, LIME, LIME)
const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material]

for (const m of gridMaterials) {
  m.transparent = true
  m.opacity = 0.1
  m.depthWrite = false
  disposables.push(m)
}

grid.position.y = -7
disposables.push(grid.geometry)

/* --- radial glows --------------------------------------------------- */
function makeGlow(color: THREE.Color, strength: number) {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: color },
      uStrength: { value: strength },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uStrength;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        float d = distance(vUv, vec2(0.5));
        // Slow breathe so the glow never sits perfectly static.
        float pulse = 0.85 + 0.15 * sin(uTime * 0.5);
        float alpha = smoothstep(0.5, 0.0, d) * uStrength * pulse;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  })

  disposables.push(material)

  return material
}

const limeGlow = makeGlow(LIME, 0.16)
const orangeGlow = makeGlow(ORANGE, 0.1)

/* --- pointer parallax ------------------------------------------------
   Tracked as a normalised -1..1 target and eased toward in the render
   loop, so the camera trails the cursor instead of snapping to it. */
const pointer = { x: 0, y: 0 }
const eased = { x: 0, y: 0 }

function onPointerMove(e: PointerEvent) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1
}

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)

  // The canvas is mounted once in app.vue and lives for the whole
  // session, so this only runs on teardown — but a leaked GPU buffer
  // per hot-reload adds up in development.
  for (const d of disposables) d.dispose()
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0

  eased.x += (pointer.x - eased.x) * 0.04
  eased.y += (pointer.y - eased.y) * 0.04

  limeGlow.uniforms.uTime.value = elapsed
  orangeGlow.uniforms.uTime.value = elapsed

  if (cameraRef.value) {
    // Parallax stays small: this sits behind live text, and anything
    // larger turns reading into a moving target.
    cameraRef.value.position.x = eased.x * 0.9
    cameraRef.value.position.y = -eased.y * 0.6 - progress * 1.4
    cameraRef.value.lookAt(0, -progress * 1.2, 0)
  }

  if (solidA.value) {
    solidA.value.rotation.x = elapsed * 0.09 + progress * 0.8
    solidA.value.rotation.y = elapsed * 0.12 + progress * 1.1
  }

  if (solidB.value) {
    solidB.value.rotation.z = elapsed * 0.07
    solidB.value.rotation.x = -elapsed * 0.05
    solidB.value.position.y = -2.4 + Math.sin(elapsed * 0.35) * 0.5
  }

  if (solidC.value) {
    solidC.value.rotation.y = -elapsed * 0.16
    solidC.value.rotation.z = elapsed * 0.06
  }

  // Rolls toward the viewer and wraps at one cell, so the floor reads as
  // continuous travel rather than a grid sliding off its own edge. Driven
  // through the object directly — <primitive> is not documented to
  // forward a template ref, and it's already in scope here.
  grid.position.z = ((elapsed * 0.6) % 2) - 1

  farField.rotation.y = elapsed * 0.012
  nearField.rotation.y = -elapsed * 0.02
  nearField.rotation.x = eased.y * 0.05
})
</script>

<template>
  <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, 8]" :fov="48" make-default />

  <TresAmbientLight :intensity="0.4" color="#f4f4ed" />
  <TresDirectionalLight :position="[4, 3, 5]" :intensity="0.7" :color="LIME" />
  <TresPointLight :position="[-6, -2, 2]" :intensity="18" :distance="24" :color="ORANGE" />

  <primitive :object="farField" />
  <primitive :object="nearField" />
  <primitive :object="grid" />

  <!-- glows sit furthest back and bloom through everything in front -->
  <TresMesh :position="[4.6, 1.8, -8]">
    <TresPlaneGeometry :args="[16, 16]" />
    <primitive :object="limeGlow" attach="material" />
  </TresMesh>

  <TresMesh :position="[-6, -3, -9]">
    <TresPlaneGeometry :args="[14, 14]" />
    <primitive :object="orangeGlow" attach="material" />
  </TresMesh>

  <!-- Three wireframe solids on their own axes and speeds. Held to the
       edges of the frame so they frame the content rather than sit
       behind the middle of a paragraph. -->
  <TresMesh ref="solidA" :position="[4.9, 2.1, -3]">
    <TresIcosahedronGeometry :args="[1.5, 0]" />
    <TresMeshBasicMaterial :color="LIME" wireframe :transparent="true" :opacity="0.5" />
  </TresMesh>

  <TresMesh ref="solidB" :position="[-5.4, -2.4, -4]">
    <TresTorusKnotGeometry :args="[0.9, 0.24, 96, 12]" />
    <TresMeshBasicMaterial :color="LIME" wireframe :transparent="true" :opacity="0.28" />
  </TresMesh>

  <TresMesh ref="solidC" :position="[6.4, -3.2, -6]">
    <TresOctahedronGeometry :args="[1.5, 0]" />
    <TresMeshBasicMaterial :color="ORANGE" wireframe :transparent="true" :opacity="0.35" />
  </TresMesh>
</template>
