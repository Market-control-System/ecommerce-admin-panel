<script setup>
// import '../assets/styles/mainCarcas.scss';
import useUserStore from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
    <div class="container ">
        Count project -
        {{ userStore.userCountProjects }}
    </div>
</template>

<style lang="scss">
//@import "@/assets/styles/my-component-styles.scss";
</style>
