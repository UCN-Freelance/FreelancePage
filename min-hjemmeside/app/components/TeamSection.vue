<script setup lang="ts">
const teamMembers = [
  {
    name: 'Omid Zahidi',
    title: 'Projekt Ansvarlig',
    secondaryTitle: 'Software Developer',
    image: '/team/Omid.jpg',
  },
  {
    name: 'Mozamel Bakshi',
    title: 'Account Manager',
    secondaryTitle: 'Software Developer',
    image: '/team/Mozamel.jpg',
  },
  {
    name: 'Oliver Olsen',
    title: 'Økonomi Ansvarlig',
    secondaryTitle: 'Software Developer',
    image: '/team/Olver.jpg',
  },
  {
    name: 'Patrick Bech',
    title: 'Software Developer',
    image: '/team/Patrick.jpg',
  },
  {
    name: 'Frederik Pedersen',
    title: 'Software Developer',
    image: '/team/Frederik.jpg',
  },
  {
    name: 'Peter Løth',
    title: 'Software Developer',
    image: '/team/Peter.jpg',
  },
  {
    name: 'Magnus Germundsson',
    title: 'Software Developer',
    image: '/team/Magnus.jpg',
  },
]
</script>

<template>
  <section class="team-section">
    <div class="team-container">
      <div class="section-header">
        <div class="section-heading">
          <h2>
            <span class="heading-primary">Syv udviklere.</span>
            <span class="heading-secondary">Ét samlet team.</span>
          </h2>

          <p>
            Vi kombinerer softwareudvikling, design og teknisk erfaring
            for at bygge løsninger, der både fungerer og føles rigtige.
          </p>
        </div>
      </div>

      <div class="team-grid">
        <TeamMemberCard
          v-for="member in teamMembers"
          :key="member.name"
          :name="member.name"
          :title="member.title"
          :secondary-title="member.secondaryTitle"
          :image="member.image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 110px 24px;
  background: #f8f9fb;
}

.team-container {
  max-width: 1240px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 64px;
}

.section-heading {
  max-width: 820px;
}

.section-heading h2 {
  margin: 0;

  color: #111520;

  font-size: clamp(42px, 5vw, 68px);
  font-weight: 650;

  line-height: 0.98;
  letter-spacing: -0.055em;
}

.heading-primary,
.heading-secondary {
  display: block;
}

.heading-primary {
  color: #111520;
}

.heading-secondary {
  color: #a1a6af;
}

.section-heading p {
  max-width: 590px;

  margin: 28px 0 0;

  color: #686e79;

  font-size: 16px;
  line-height: 1.7;
}

/* =========================
   TEAM GRID
   ========================= */

.team-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 42px 22px;
}

.team-grid :deep(.team-card) {
  flex: 0 0 calc((100% - 66px) / 4);
}

/* =========================
   TABLET
   ========================= */

@media (max-width: 1000px) {
  .team-grid :deep(.team-card) {
    flex-basis: calc((100% - 44px) / 3);
  }
}

/* =========================
   MOBILE
   ========================= */

@media (max-width: 750px) {
  .team-section {
    padding: 80px 18px;
  }

  .section-header {
    margin-bottom: 44px;
  }

  .section-heading {
    max-width: 100%;
  }

  .section-heading h2 {
    font-size: clamp(40px, 11vw, 54px);
  }

  .section-heading p {
    margin-top: 22px;

    font-size: 15px;
    line-height: 1.65;
  }

  .team-grid {
    gap: 34px 14px;
  }

  .team-grid :deep(.team-card) {
    flex-basis: calc((100% - 14px) / 2);
  }
}

/* =========================
   SMALL MOBILE
   ========================= */

@media (max-width: 500px) {
  .team-grid {
    gap: 38px;
  }

  .team-grid :deep(.team-card) {
    flex-basis: 100%;
  }
}
</style>