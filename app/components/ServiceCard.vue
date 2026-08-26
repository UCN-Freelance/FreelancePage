<script setup lang="ts">
defineProps<{
  number: string
  title: string
  description: string
  items: string[]
}>()
</script>

<template>
  <article class="service-card">
    <span class="service-number">
      {{ number }}
    </span>

    <div class="card-content">
      <h3>
        {{ title }}
      </h3>

      <p>
        {{ description }}
      </p>
    </div>

    <div class="service-items">
      <span
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.service-card {
  padding: 24px 28px;

  display: flex;
  flex-direction: column;

  border: 1px solid rgba(17, 21, 32, 0.07);
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.78);

  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease,
    border-color 220ms ease;
}

.service-card:hover {
  transform: translateY(-3px);

  border-color: rgba(17, 21, 32, 0.11);

  background: white;

  box-shadow:
    0 14px 38px rgba(18, 22, 33, 0.06);
}

.service-number {
  margin-bottom: 30px;

  color: #9ca1aa;

  font-size: 10px;
  font-weight: 650;

  letter-spacing: 0.08em;
}

.card-content h3 {
  margin: 0;

  color: #111520;

  font-size: 26px;
  font-weight: 650;

  line-height: 1.05;
  letter-spacing: -0.04em;
}

.card-content p {
  max-width: 540px;

  margin: 13px 0 0;

  color: #717783;

  font-size: 13px;
  line-height: 1.65;
}

.service-items {
  margin-top: 24px;

  display: flex;
  flex-wrap: wrap;

  gap: 7px;
}

.service-items span {
  padding: 6px 10px;

  border: 1px solid rgba(17, 21, 32, 0.07);
  border-radius: 999px;

  background: #f5f6f8;

  color: #717783;

  font-size: 9px;
  font-weight: 600;

  letter-spacing: 0.025em;
}

@media (max-width: 750px) {
  .service-card {
    padding: 22px 24px;
  }

  .service-number {
    margin-bottom: 26px;
  }

  .card-content h3 {
    font-size: 24px;
  }

  .card-content p {
    font-size: 12.5px;
  }

  .service-items {
    margin-top: 22px;
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: 20px;
    border-radius: 17px;
  }

  .service-number {
    margin-bottom: 22px;
  }

  .card-content h3 {
    font-size: 23px;
  }

  .service-items {
    margin-top: 20px;
  }
}
</style>