<template>
  <div>
    <!-- Add the NavBar -->
    <NavBar />

    <!-- Card container -->
    <div class="card-grid">
      <nuxt-card v-for="(card, index) in cards" :key="index" class="card-item">
        <div class="card-content">
          <img src="/images/scanette.png" alt="Scanette Image" class="card-image" />
          <div class="card-info">
            <div>ID: {{ card.id }}</div>
            <div>Status: {{ card.status }}</div>
            <div>Battery: {{ card.battery }}%</div>
          </div>
        </div>
      </nuxt-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NavBar from '~/components/NavBar.vue';

const cards = ref([
  { id: '001', status: 'Active', battery: 85 },
  { id: '002', status: 'Inactive', battery: 60 },
  { id: '003', status: 'Active', battery: 90 },
  { id: '004', status: 'Charging', battery: 40 },
  { id: '005', status: 'Inactive', battery: 70 },
  { id: '006', status: 'Active', battery: 50 },
  { id: '007', status: 'Inactive', battery: 95 },
  { id: '008', status: 'Charging', battery: 30 },
  { id: '009', status: 'Active', battery: 100 },
  { id: '010', status: 'Charging', battery: 20 },
  { id: '011', status: 'Inactive', battery: 55 },
  { id: '012', status: 'Active', battery: 75 }
]);

let ws;

onMounted(() => {
  // Initialize WebSocket
  ws = new WebSocket('ws://localhost:3001'); // Remplacez l'URL par celle de votre backend WebSocket

  ws.onopen = () => {
    console.log('WebSocket connecté');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.event === 'turnover_change') {
      console.log('Turnover Change:', data.data);
    } else if (data.event === 'active_scanners_change') {
      console.log('Active Scanners Change:', data.data.active_count);
    }
  };

  ws.onclose = () => {
    console.log('WebSocket déconnecté');
  };

  ws.onerror = (error) => {
    console.error('Erreur WebSocket:', error);
  };
});

onUnmounted(() => {
  // Fermer la connexion WebSocket lors du démontage
  if (ws) {
    ws.close();
  }
});
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.card-item {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 15px; /* Rounded corners */
  display: flex;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
}

.card-image {
  width: 60px;
  height: 60px;
  margin-right: 20px;
}

.card-info {
  display: flex;
  flex-direction: column;
}
</style>

