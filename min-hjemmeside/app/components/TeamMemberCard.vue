<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  name: string
  title: string
  image: string
  secondaryTitle?: string
}>()

const imageFailed = ref(false)
const imageEl = ref<HTMLImageElement | null>(null)

const initials = computed(() =>
  props.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase(),
)

onMounted(() => {
  if (imageEl.value && imageEl.value.complete && imageEl.value.naturalWidth === 0) {
    imageFailed.value = true
  }
})
</script>

<template>
  <article class="team-card">
    <div class="image-wrapper">
      <img
        v-if="!imageFailed"
        ref="imageEl"
        :src="image"
        :alt="name"
        class="member-image"
        @error="imageFailed = true"
      />

      <div v-else class="member-placeholder">
        <span class="placeholder-initials">{{ initials }}</span>
      </div>
    </div>

    <div class="member-info">
      <div>
        <h3>{{ name }}</h3>

        <p class="primary-title">
          {{ title }}
        </p>

        <p v-if="secondaryTitle" class="secondary-title">
          {{ secondaryTitle }}
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.team-card {
  display: flex;
  flex-direction: column;
  gap: 16px;

  min-width: 0;
}

.image-wrapper {
  position: relative;

  width: 100%;
  aspect-ratio: 4 / 5;

  overflow: hidden;

  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  background: var(--bg-raised);
}

.member-image {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition: transform 400ms ease;
}

.member-placeholder {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--accent);
}

.placeholder-initials {
  color: var(--bg);

  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 700;

  letter-spacing: -0.02em;
}

.team-card:hover .member-image {
  transform: scale(1.03);
}

.member-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 20px;
}

.member-info h3 {
  margin: 0 0 4px;

  color: var(--ink);

  font-size: 17px;
  font-weight: 700;

  letter-spacing: -0.01em;
}

.primary-title {
  margin: 0;

  color: var(--ink-soft);

  font-size: 13px;
  font-weight: 500;

  line-height: 1.45;
}

.secondary-title {
  margin: 3px 0 0;

  color: var(--slate);

  font-family: var(--font-mono);
  font-size: 11px;

  line-height: 1.4;
}
</style>
