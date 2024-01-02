<script setup>
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const exitBtn = () => {
  authStore.logout();
};
</script>

<template>
  <div class="container">
    <button class="btn btn-primary" @click="exitBtn">Exit</button>
  </div>
</template>