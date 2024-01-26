<template>
    <RouterView />
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useStore } from 'vuex';

    const initApp = async () => {
        await useStore().dispatch("checkAuthState");
    };

    onMounted(() => {
        initApp();
    });
</script>