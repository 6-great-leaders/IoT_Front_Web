<template>
  <div>
    <!-- Add the NavBar -->
    <NavBar />

    <!-- Content Section -->
    <div class="content">
      <h1>Préférence produit pour votre magasin</h1>
    </div>
  </div>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue';
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); /* Adjust height to account for the navbar */
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
  color: #2ecc71; /* Consistent green color */
  margin: 0;
}
</style>

