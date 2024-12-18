<template>
  <div>
    <!-- Add the NavBar -->
    <NavBar />

    <!-- Small cards grid -->
    <div class="small-cards-grid">
      <nuxt-card v-for="(card, index) in cards" :key="index" class="small-card">
        <div class="card-content">
          <h3>{{ card.title }}</h3>
          <p>{{ card.content }}</p>
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

let ws;
const cards = ref([
  {title : 'Active scanners', content: 0},
  {title : 'Number of articles', content: 0},
  {title : 'Number of scanners', content: 0},
  {title : 'Suggested articles', content: 0},
  {title : 'Suggested articles scanned', content: 0},
  {title : 'Global turnover', content: 0},
])

async function fetchBIData() {
  try {
    const response = await fetch('http://146.148.5.29:4000/monitoring/bi'); // Remplace l'URL par celle de ton endpoint
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    cards.value[0].content = data.nbActiveScanner;
    cards.value[1].content = data.nbArticles;
    cards.value[2].content = 11;
    cards.value[3].content = data.suggestedArticles;
    cards.value[4].content = data.suggestedArticlesBought;
    cards.value[5].content = data.turnover;
  } catch (error) {
    console.error('Erreur lors de la récupération des données des scanettes:', error);
  }
}

onMounted(async () => {
  await fetchBIData();

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
      cards.value[0].content = data.data.active_count;
    } else if (data.event === 'nb_articles_change') {
      console.log(`Number of Articles Change - Scanner ID: ${data.data.scanner_id}, Old Value: ${data.data.old_value}, New Value: ${data.data.new_value}`);
      cards.value[1].content = data.data.new_value;
    } else if (data.event === 'nb_articles_ai_change') {
      console.log(`AI Articles Change - Scanner ID: ${data.data.scanner_id}, Old Value: ${data.data.old_value}, New Value: ${data.data.new_value}`);
      cards.value[2].content = data.data.new_value;
    } else if (data.event === 'scanner_state_change') { // Nouveau bloc
      console.log(`Scanner State Change - Scanner ID: ${data.data.scanner_id}, Old State: ${data.data.old_state}, New State: ${data.data.new_state}`);
    }
  };
});

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

