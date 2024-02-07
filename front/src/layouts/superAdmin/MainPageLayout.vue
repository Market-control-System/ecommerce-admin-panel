<script setup>
import NavBar from '@/components/NavBar/NavBar.vue';
import GetKursUSD from '@/components/Plugin/GetKursUSD/GetKursUSD.vue';
import StorageCost from '@/components/Plugin/StorageCost/StorageCost.vue';
import useTokenStore from '@/stores/tokenStore';

const tokenStore = useTokenStore();
</script>

<template>
    <NavBar />
    <div class="container-main">
        <slot />
        <div class="row">
            <div class="col-md-2 col-xl-2">
                <GetKursUSD :token="tokenStore.token" />
            </div>
            <div class="col-md-3 col-xl-3">
                <StorageCost :token="tokenStore.token" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container-main {
        padding-top: 70px;
        margin-left:20px;
        margin-right:20px;
    }
</style>
