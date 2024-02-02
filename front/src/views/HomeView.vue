<script setup>
// import '../assets/styles/mainCarcas.scss';
import useUserStore from '@/stores/userStore';
import NavBar from '@/components/NavBar/NavBar.vue';

const userStore = useUserStore();
</script>

<template>
    <NavBar />
    <div class="container ">
        Count project -
        {{ userStore.userCountProjects }}
    </div>
</template>

<style lang="scss">
//@import "@/assets/styles/my-component-styles.scss";
</style>
