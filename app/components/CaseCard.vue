<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
}>()
</script>

<template>
  <article class="case-card">
    <div class="case-image-wrapper">
      <img
        :src="image"
        :alt="title"
        class="case-image"
      />
    </div>

    <div class="case-content">
      <h2>
        {{ title }}
      </h2>

      <p>
        {{ description }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.case-card {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid rgba(17, 21, 32, 0.07);
  border-radius: 20px;

  background: white;

  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;
}

.case-card:hover {
  transform: translateY(-4px);

  border-color: rgba(17, 21, 32, 0.11);

  box-shadow:
    0 16px 42px rgba(18, 22, 33, 0.07);
}

.case-image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 10;

  overflow: hidden;

  background: #eef0f3;
}

.case-image {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition: transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.case-card:hover .case-image {
  transform: scale(1.035);
}

.case-content {
  padding: 24px 26px 28px;
}

.case-content h2 {
  margin: 0;

  color: #111520;

  font-size: 24px;
  font-weight: 650;

  line-height: 1.1;
  letter-spacing: -0.04em;
}

.case-content p {
  margin: 12px 0 0;

  color: #717783;

  font-size: 13px;
  line-height: 1.65;
}

@media (max-width: 600px) {
  .case-card {
    border-radius: 17px;
  }

  .case-content {
    padding: 20px 21px 23px;
  }

  .case-content h2 {
    font-size: 22px;
  }
}
</style>