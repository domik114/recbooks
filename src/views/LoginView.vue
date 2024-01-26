<template>
  <div class="container mt-5">
    <h1>Formularz Logowania</h1>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Adres email:</label>
        <input v-model="loginData.email" type="email" class="form-control" id="email" required>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Hasło:</label>
        <input v-model="loginData.password" type="password" class="form-control" id="password" required>
      </div>

      <button type="submit" class="btn btn-primary">Zaloguj</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '../router';

export default {
  setup() {
    const loginData = ref({
      email: '',
      password: ''
    });

    const store = useStore();

    const login = async () => {
      // Prosta walidacja - sprawdź, czy pola są wypełnione
      if (!loginData.value.email || !loginData.value.password) {
        console.error("Wypełnij wszystkie pola.");
        return;
      }

      try {
        await store.dispatch('login', loginData.value);
        // Po zalogowaniu możesz przekierować użytkownika lub wykonać inne operacje
      } catch (error) {
        console.error('Błąd logowania:', error.message);
        // Obsłuż błąd logowania
      }

      // Opcjonalnie, możesz wyczyścić dane po zalogowaniu
      loginData.value = {
        email: '',
        password: ''
      };

      // Przekieruj użytkownika
      router.push("/app");
    };

    return {
      loginData,
      login
    };
  }
};
</script>