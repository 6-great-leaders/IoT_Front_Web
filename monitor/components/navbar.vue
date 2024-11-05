<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="/images/logo.png" alt="Logo" class="logo" />
    </div>
    <div class="navbar-center">
      <div
        :class="['nav-item', { active: activeItem === 'Monitoring' }]"
        @click="selectItem('Monitoring')"
      >
        Monitoring
      </div>
      <div
        :class="['nav-item', { active: activeItem === 'Statistiques' }]"
        @click="selectItem('Statistiques')"
      >
        Statistiques
      </div>
      <div
        :class="['nav-item', { active: activeItem === 'Paramètres' }]"
        @click="selectItem('Paramètres')"
      >
        Paramètres
      </div>
    </div>
    <div class="navbar-right">
      <div class="logout" @click="logout">Déconnexion</div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const activeItem = ref('Monitoring'); // Default to Monitoring

const selectItem = (item) => {
  activeItem.value = item;
};

const logout = () => {
  // Handle logout logic here
  console.log('User logged out');
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff; /* White background */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-left .logo {
  width: 50px;
  height: 50px;
}

.navbar-center {
  display: flex;
  gap: 20px;
}

.nav-item {
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px; /* Rounded shape */
  background-color: transparent; /* Default transparent */
  color: #2ecc71; /* Green text */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-item.active {
  background-color: #2ecc71; /* Green background for active */
  color: white; /* White text when active */
}

.navbar-right .logout {
  cursor: pointer;
  color: red;
  font-weight: 500;
}
</style>

