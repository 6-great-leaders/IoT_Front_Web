<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="/images/logo.png" alt="Logo" class="logo" />
    </div>
    <div class="navbar-center">
      <div
        :class="['nav-item', { active: activeItem === 'Monitoring' }]"
        @click="navigateTo('monitoring', 'Monitoring')"
      >
        Monitoring
      </div>
      <div
        :class="['nav-item', { active: activeItem === 'Statistiques' }]"
        @click="navigateTo('statistique', 'Statistiques')"
      >
        Statistiques
      </div>
      <div
        :class="['nav-item', { active: activeItem === 'Parametres' }]"
        @click="navigateTo('parametre', 'Parametres')"
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
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const activeItem = ref('');
const router = useRouter();
const route = useRoute();

const navigateTo = (path, item) => {
  activeItem.value = item;
  router.push(`/${path}`);
};

const logout = () => {
  router.push('/');
};

// Set the active item based on the current route path
const setActiveItem = () => {
  if (route.path.includes('monitoring')) {
    activeItem.value = 'Monitoring';
  } else if (route.path.includes('statistique')) {
    activeItem.value = 'Statistiques';
  } else if (route.path.includes('parametre')) {
    activeItem.value = 'Parametres';
  }
};

// Initialize the active item on mount and watch for route changes
onMounted(setActiveItem);
watch(route, setActiveItem);
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
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
  border-radius: 10px;
  background-color: transparent;
  color: #2ecc71;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-item.active {
  background-color: #2ecc71;
  color: white;
}

.navbar-right .logout {
  cursor: pointer;
  color: red;
  font-weight: 500;
}
</style>

