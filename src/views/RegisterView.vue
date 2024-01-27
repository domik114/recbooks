<template>
  <div class="container mt-5">
    <h1>Formularz Rejestracji</h1>

    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="email" class="form-label">Adres email:</label>
        <input v-model="userData.email" type="email" class="form-control" id="email" required>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Hasło:</label>
        <input v-model="userData.password" type="password" class="form-control" id="password" required>
      </div>

      <div class="mb-3">
        <label for="password2" class="form-label">Potwierdź hasło:</label>
        <input v-model="userData.password2" type="password" class="form-control" id="password2" required>
      </div>

      <div v-if="passwordsDoNotMatch" class="alert alert-danger" role="alert">
        Hasła nie są zgodne.
      </div>

      <button type="submit" class="btn btn-primary" :disabled="passwordsDoNotMatch">Zarejestruj</button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import router from '../router';
import { useStore } from 'vuex';

export default {
  setup() {
    const userData = ref({
      email: '',
      password: '',
      password2: ''
    });

    const store = useStore();

    const home = () => {
      router.push("/app");
    };

    const passwordsDoNotMatch = computed(() => userData.value.password !== userData.value.password2);

    const register = async () => {
      if (passwordsDoNotMatch.value) {
        console.error("Hasła nie są zgodne.");
        return;
      }

      console.log('Dane do rejestracji:', userData.value);

      try {
        await store.dispatch('createUser', userData.value);
      } catch (error) {
        console.error("Błąd podczas rejestracji:", error.message);
      }

      userData.value = {
        email: '',
        password: '',
        password2: ''
      };
      home();
    };

    return {
      userData,
      register,
      home,
      passwordsDoNotMatch
    };
  }
};
</script>