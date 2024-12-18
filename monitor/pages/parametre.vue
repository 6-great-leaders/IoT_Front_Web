<template>
  <div>
    <!-- NavBar -->
    <NavBar />

    <!-- Product List -->
    <div class="container">
      <h1>Liste des Produits</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Marque</th>
            <th>Poids (g)</th>
            <th>Prix (€)</th>
            <th>X</th>
            <th>Y</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in products"
            :key="product.id"
            :class="{'alt-row': index % 2 === 0}"
          >
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.weight }}</td>
            <td>{{ product.price.toFixed(2) }}</td>
            <td>
              <input
                type="number"
                v-model="editableProducts[product.id].x"
                class="coordinate-input"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="editableProducts[product.id].y"
                class="coordinate-input"
              />
            </td>
            <td>
              <button @click="updateProduct(product.id)">Modifier</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavBar from "~/components/NavBar.vue";

const products = ref([]);
const editableProducts = ref({});

const fetchProducts = async () => {
  try {
//  const data = await $fetch("http://localhost:4000/monitoring/all_articles");
    const data = await $fetch("http://146.148.5.29:4000/monitoring/all_articles");
    console.log("Produits récupérés :", data);
    products.value = data || [];
    products.value.forEach((product) => {
      editableProducts.value[product.id] = { x: product.x, y: product.y };
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error.message);
  }
};

const updateProduct = async (id) => {
  try {
    const { x, y } = editableProducts.value[id];
//  await $fetch(`http://localhost:4000/monitoring/modif_article/${id}`, {
    await $fetch(`https://34.79.197.67/monitoring/modif_article/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y }),
    });
    alert(`Produit ${id} mis à jour avec succès.`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error.message);
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #2ecc71;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #2ecc71;
  color: white;
}

.alt-row {
  background-color: #f4f4f4;
}

.coordinate-input {
  width: 60px;
  text-align: center;
}

button {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #27ae60;
}
</style>

