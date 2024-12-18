<template>
  <div class="bg-gray-100 h-screen">
    <!-- Add the NavBar -->
    <NavBar />

    <!-- Small cards grid -->
    <div class="p-5 grid grid-cols-2 gap-4">
      <div v-for="(card, index) in cards" :key="index" class="m-1 p-6 bg-white text-center rounded-lg h-52 flex justify-center items-center" :class="{
          'row-span-2 h-full': card.title === 'Active scanners',}">
        <div class="flex flex-col space-y-4">
          <h3 class="text-xl font-semibold">{{ card.title }}</h3>
          <p class="text-5xl font-semibold" :class="{'text-green-500': card.title === 'Active scanners'}">{{ card.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue';

let ws;
const cards = ref([
  {title : 'Active scanners', content: 0},
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
    cards.value[1].content = 11;
    cards.value[2].content = 3;
    cards.value[3].content = data.suggestedArticlesBought;
    cards.value[4].content = "" + Math.floor(data.turnover) + "€";
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

    if (data.event === 'global_turnover_change') {
      console.log('Turnover Change:', data.data);
      cards.value[4].content = "" + data.data.global_turnover + "€";
    } else if (data.event === 'active_scanners_change') {
      console.log('Active Scanners Change:', data.data.active_count);
      cards.value[0].content = data.data.active_count;
    } else if (data.event === 'nb_articles_change') {
      console.log(`Number of Articles Change - Scanner ID: ${data.data.scanner_id}, Old Value: ${data.data.old_value}, New Value: ${data.data.new_value}`);
    } else if (data.event === 'nb_articles_ai_change') {
      console.log(data);
      console.log(`AI Articles Change - Scanner ID: ${data}, Old Value: ${data.data.old_value}, New Value: ${data.data.new_value}`);
      cards.value[3].content = data.data.total_ai_articles;
    } else if (data.event === 'scanner_state_change') { // Nouveau bloc
      console.log(`Scanner State Change - Scanner ID: ${data.data.scanner_id}, Old State: ${data.data.old_state}, New State: ${data.data.new_state}`);
    }
  };
});

</script>


