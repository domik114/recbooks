<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Moja Biblioteka</a>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Szukaj książki"
          aria-label="Search"
          v-model="searchQuery"
          @input="$emit('update:modelValue', searchQuery)"
        />
      </form>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'NavBar',
  props: {
    modelValue: String,
  },
  setup(props) {
    const searchQuery = ref(props.modelValue);
    console.log(searchQuery);

    return {
      searchQuery,
    };
  },
};
</script>
