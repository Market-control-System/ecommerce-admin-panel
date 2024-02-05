<script setup>
// import '../assets/styles/mainCarcas.scss';
import NavBar from '@/components/NavBar/NavBar.vue';
import useUserStore from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
    <NavBar />
    {{ userStore.userInfo }} fgdf gfdggf
</template>

<style lang="scss">
//@import "@/assets/styles/my-component-styles.scss";
</style>
