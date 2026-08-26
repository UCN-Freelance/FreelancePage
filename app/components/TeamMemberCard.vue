<script setup lang="ts">
defineProps<{
  name: string
  title: string
  image: string
  secondaryTitle?: string
}>()
</script>

<template>
  <article class="team-card">
    <div class="image-wrapper">
      <img
        :src="image"
        :alt="name"
        class="member-image"
      />

      <div class="image-overlay" />
    </div>

    <div class="member-info">
      <div>
        <h3>{{ name }}</h3>

        <p class="primary-title">
          {{ title }}
        </p>

        <p
          v-if="secondaryTitle"
          class="secondary-title"
        >
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

  border-radius: 18px;

  background: #eef0f3;
}

.member-image {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition:
    transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1),
    filter 300ms ease;
}

.image-overlay {
  position: absolute;
  inset: 0;

  pointer-events: none;

  background:
    linear-gradient(
      to top,
      rgba(10, 14, 22, 0.12),
      transparent 35%
    );

  opacity: 0;

  transition: opacity 300ms ease;
}

.team-card:hover .member-image {
  transform: scale(1.035);
}

.team-card:hover .image-overlay {
  opacity: 1;
}

.member-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 20px;

  padding: 0 2px;
}

.member-info h3 {
  margin: 0 0 5px;

  color: #111520;

  font-size: 17px;
  font-weight: 650;

  letter-spacing: -0.025em;
}

.primary-title {
  margin: 0;

  color: #6d7380;

  font-size: 13px;
  font-weight: 500;

  line-height: 1.45;
}

.secondary-title {
  margin: 3px 0 0;

  color: #9a9faa;

  font-size: 12px;
  font-weight: 500;

  line-height: 1.4;
}
</style>