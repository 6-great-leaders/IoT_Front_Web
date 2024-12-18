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
  { id: '001', status: 'OFF', battery: 85 },
  { id: '002', status: 'OFF', battery: 60 },
  { id: '003', status: 'OFF', battery: 90 },
  { id: '004', status: 'OFF', battery: 40 },
  { id: '005', status: 'OFF', battery: 70 },
  { id: '006', status: 'OFF', battery: 50 },
  { id: '007', status: 'OFF', battery: 95 },
  { id: '008', status: 'OFF', battery: 30 },
  { id: '009', status: 'OFF', battery: 100 },
  { id: '010', status: 'OFF', battery: 20 },
  { id: '011', status: 'OFF', battery: 55 },
  { id: '012', status: 'OFF', battery: 75 }
]);

let ws;

// Fonction pour récupérer les données depuis l'API
async function fetchScannerData() {
  try {
    const response = await fetch('http://146.148.5.29:4000/monitoring/fleet'); // Remplace l'URL par celle de ton endpoint
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();

    // Initialisation des cartes avec les données récupérées
    cards.value = data.map((scanner) => ({
      id: scanner.id,
      status: scanner.state,
      battery: Math.floor(Math.random() * 51) + 50 // Génère une batterie aléatoire (50-100%)
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des données des scanettes:', error);
  }
}

onMounted(async () => {
  await fetchScannerData();

  // Initialize WebSocket
  ws = new WebSocket('ws://146.148.5.29:3001'); // Remplacez l'URL par celle de votre backend WebSocket
  //ws = new WebSocket('ws://localhost:3001');

  ws.onopen = () => {
    console.log('WebSocket connecté');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.event === 'turnover_change') {
      console.log('Turnover Change:', data.data);
    } else if (data.event === 'active_scanners_change') {
      console.log('Active Scanners Change:', data.data.active_count);
    } else if (data.event === 'nb_articles_change') {
      console.log(`Number of Articles Change - Scanner ID: ${data.data.scanner_id}, Old Value: ${data.data.old_value}, New Value: ${data.data.new_value}`);
      // updateCardData(data.data.scanner_id, 'nbArticles', data.data.new_value);
    } else if (data.event === 'nb_articles_ai_change') {
      console.log(`AI Articles Change - Scanner ID: ${data.data.scanner_id}, Old Value: ${data.data.old_value}, New Value: ${data.data.new_value}`);
      // updateCardData(data.data.scanner_id, 'nbArticlesAI', data.data.new_value);
    } else if (data.event === 'scanner_state_change') { // Nouveau bloc
    console.log(`Scanner State Change - Scanner ID: ${data.data.scanner_id}, Old State: ${data.data.old_state}, New State: ${data.data.new_state}`);

    // Exemple : mise à jour de l'affichage des scanettes
    const scannerId = data.data.scanner_id;
    const newState = data.data.new_state;
    console.log(newState);

    // Met à jour uniquement la scanette avec l'ID 1
    cards.value = cards.value.map((card) => {
      if (card.id === 1) {
        return {
          ...card, // Copie les autres propriétés existantes
          status: newState, // Mise à jour de l'état (state)
        };
      }
      return card; // Ne change rien pour les autres scanettes
    });
    console.log(cards.value)
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

