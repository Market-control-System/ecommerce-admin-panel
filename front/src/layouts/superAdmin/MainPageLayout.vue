<script setup>
import NavBar from '@/components/NavBar/NavBar.vue';
import GetKursUSD from '@/components/Plugin/GetKursUSD/GetKursUSD.vue';
import useTokenStore from '@/stores/tokenStore';

const tokenStore = useTokenStore();
</script>

<template>
    <NavBar />
    <div class="container-main">
        <slot />
        <GetKursUSD :token="tokenStore.token" />
    </div>
</template>

<style scoped>
    .container-main {
        padding-top: 70px;
        margin-left:20px;
        margin-right:20px;
    }
</style>
