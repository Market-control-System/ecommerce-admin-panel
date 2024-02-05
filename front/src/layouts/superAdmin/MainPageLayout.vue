<script setup>
import NavBar from '@/components/NavBar/NavBar.vue';
</script>

<template>
    <NavBar />
    <div class="container-main">
        <slot />
    </div>
</template>

<style scoped>
    .container-main {
        padding-top: 70px;
        margin-left:20px;
        margin-right:20px;
    }
</style>
