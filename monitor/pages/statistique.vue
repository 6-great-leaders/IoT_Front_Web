<template>
  <div>
    <!-- Add the NavBar -->
    <NavBar />

    <!-- Small cards grid -->
    <div class="small-cards-grid">
      <nuxt-card v-for="n in 8" :key="n" class="small-card">
        <div class="card-content">
          <h3>Card {{ n }}</h3>
          <p>Content for card {{ n }}</p>
        </div>
      </nuxt-card>
    </div>

    <!-- Large cards for graphs -->
    <div class="large-cards-grid">
      <nuxt-card class="large-card">
        <div class="card-content">
          <h3>Graph 1</h3>
        </div>
      </nuxt-card>
      <nuxt-card class="large-card">
        <div class="card-content">
          <h3>Graph 2</h3>
        </div>
      </nuxt-card>
    </div>
  </div>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue';
</script>

<style scoped>
/* Grid for small cards */
.small-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 cards per row */
  gap: 20px;
  padding: 20px;
}

/* Style for small cards */
.small-card {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Grid for large cards */
.large-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 cards sharing the space */
  gap: 20px;
  padding: 20px;
}

/* Style for large cards */
.large-card {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-content {
  color: #2ecc71; /* Consistent green */
}
</style>

