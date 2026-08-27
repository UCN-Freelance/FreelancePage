<script setup lang="ts">
import { shallowRef } from 'vue'
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

const ring = shallowRef()
const orb = shallowRef()

// A soft radial glow behind the geometry — the only shader in this
// scene, kept deliberately simple (no particles, no noise).
const glowMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  uniforms: {
    uColor: { value: new THREE.Color('#6366f1') },
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
    varying vec2 vUv;
    void main() {
      float d = distance(vUv, vec2(0.5));
      float alpha = smoothstep(0.5, 0.0, d) * 0.08;
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0

  if (ring.value) {
    ring.value.rotation.x = elapsed * 0.03 + progress * 0.6
    ring.value.rotation.y = elapsed * 0.045 + progress * 0.9
  }

  if (orb.value) {
    orb.value.rotation.z = elapsed * 0.02
    orb.value.position.y = -2.8 + progress * 1.2
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 8]" :fov="45" make-default />

  <TresAmbientLight :intensity="0.6" color="#1e293b" />
  <TresDirectionalLight :position="[4, 3, 5]" :intensity="0.5" color="#6366f1" />

  <!-- soft ambient glow, upper right -->
  <TresMesh :position="[4.8, 1.5, -4]">
    <TresPlaneGeometry :args="[9, 9]" />
    <primitive :object="glowMaterial" attach="material" />
  </TresMesh>

  <!-- a single quiet wireframe form — the one signature shape,
       low-poly and translucent so it never competes with content.
       Kept well over to the right and modestly sized so it clears
       text columns across the different page layouts it appears on. -->
  <TresMesh ref="ring" :position="[4.9, 2.1, -3]">
    <TresIcosahedronGeometry :args="[1.4, 0]" />
    <TresMeshBasicMaterial color="#6366f1" :wireframe="true" :transparent="true" :opacity="0.18" />
  </TresMesh>

  <TresMesh ref="orb" :position="[6.6, -2.8, -6]">
    <TresTorusGeometry :args="[1, 0.04, 8, 48]" />
    <TresMeshBasicMaterial color="#6366f1" :transparent="true" :opacity="0.16" />
  </TresMesh>
</template>
