<script setup>
// import '../assets/styles/mainCarcas.scss';
import MainPageLayoutSuperAdmin from '@/layouts/superAdmin/MainPageLayout.vue';
import NavBar from '@/components/NavBar/NavBar.vue';
import useUserStore from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
    <MainPageLayoutSuperAdmin v-if="userStore.userInfo.role===0">
    </MainPageLayoutSuperAdmin>
    <div v-else>
        <NavBar />
        {{ userStore.userInfo }} fgdf gfdggf
    </div>
</template>

<style lang="scss">
//@import "@/assets/styles/my-component-styles.scss";
</style>
