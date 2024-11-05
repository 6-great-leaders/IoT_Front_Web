<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Scan IT</h1>
      <h2>Admin panel</h2>
      <form @submit.prevent="submitForm">
        <input type="text" placeholder="Username" v-model="username" class="input-field" />
        <input type="password" placeholder="Password" v-model="password" class="input-field" />
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const router = useRouter();

const submitForm = () => {
  // Add your login logic here
  console.log('Login form submitted:', username.value, password.value);

  // Redirect to the monitoring page after login
  router.push('/monitoring');
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff; /* White background */
}

.login-box {
  padding: 40px;
  background-color: #f0f0f0;
  border-radius: 15px; /* Rounded box */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 0px;
  color: #2ecc71; /* Green text */
}

h2 {
  font-weight: 500;
  font-size: 16px;
  margin: 0px 0px 20px 0px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 10px; /* Rounded input fields */
}

.login-button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #2ecc71; /* Green button */
  color: white;
  border: none;
  border-radius: 10px; /* Rounded button */
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #27ae60; /* Darker green on hover */
}
</style>

