<template>
  <div class="color-switcher">
    <label for="backgroundColor">Tryb nocny:</label>
    <input type="checkbox" v-model="nightMode" @change="toggleNightMode" />
  </div>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue';

export default {
  name: 'ColorSwitcher',
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const nightMode = ref(props.modelValue === 'black');

    const toggleNightMode = () => {
      nightMode.value = !nightMode.value;
      emit('update:modelValue', nightMode.value ? 'black' : 'white');
    };

    // Aktualizuj kolor tła, gdy komponent zostanie zamontowany
    onMounted(() => {
      document.body.style.backgroundColor = nightMode.value ? 'black' : 'white';
    });

    // Aktualizuj kolor tła po zmianie prop 'modelValue'
    watchEffect(() => {
      nightMode.value = props.modelValue === 'black';
      document.body.style.backgroundColor = nightMode.value ? 'black' : 'white';
      document.body.style.color = nightMode.value ? 'white' : 'black';
    });

    return {
      nightMode,
      toggleNightMode,
    };
  },
};
</script>
