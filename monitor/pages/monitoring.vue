<template>
  <div class="bg-gray-100 h-screen">
    <!-- Add the NavBar -->
    <NavBar />

    <!-- Card container -->
    <div class="p-5 grid grid-cols-4 gap-4">
      <div v-for="(card, index) in cards" :key="index"
      class="m-1 p-6 bg-white flex align-center rounded-lg">
        <div class="flex">
          <img src="/images/scannerGPS.png" alt="Scanette Image" class="w-28 h-28" />
          <div class="flex flex-col">
            <div class="text-lg font-semibold">SGPS-{{ card.id }}</div>
            <div class="font-medium text-sm mb-6">{{ card.battery }}% charged</div>
            <span class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full border" :class="{
                    'bg-green-100 text-green-800 border-green-400': card.status === 'ACTIVE',
                    'bg-orange-100 text-orange-800 border-orange-400': card.status === 'IDLE',
                    'bg-gray-100 text-gray-800 border-gray-400': card.status === 'OFF',
                    'bg-red-100 text-red-800 border-red-400': card.status === 'ERROR',
                }">{{ card.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NavBar from '~/components/NavBar.vue';

const cards = ref([
  { id: '002', status: 'OFF', battery: 60 },
  { id: '003', status: 'OFF', battery: 90 },
  { id: '004', status: 'OFF', battery: 40 },
  { id: '005', status: 'OFF', battery: 70 },
  { id: '006', status: 'OFF', battery: 50 },
  { id: '007', status: 'OFF', battery: 95 },
  { id: '008', status: 'OFF', battery: 30 },
  { id: '009', status: 'OFF', battery: 100 },
  { id: '010', status: 'OFF', battery: 20 },
  { id: '001', status: 'OFF', battery: 85 },
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
    /*cards.value = cards.value.map((card) => {
      if (card.id === '001') {
        return {
          ...card, // Copie les autres propriétés existantes
          status: scanner.state, // Mise à jour de l'état (state)
          battery: Math.floor(Math.random() * 51) + 50
        };
      }
      return card; // Ne change rien pour les autres scanettes
    });*/
    cards.value = data.map((scanner) => ({
      id: scanner.id,
      status: scanner.state,
      battery: Math.floor(Math.random() * 51) + 50 // Génère une batterie aléatoire (50-100%)
    }));
    console.log(cards.value)
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
    // const scannerId = data.data.scanner_id;
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

