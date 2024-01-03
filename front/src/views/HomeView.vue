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
    <div class="row">
      <div class="col-3">
        <div class="side-bar-logo">Admin Panel</div>
        {{ authStore.user }}
      </div>
      <div class="col-9">

      </div>
    </div>
    
  </div>
</template>

<style>

.container {
  background-color: var(--bs-yellow-300);
}
.side-bar-logo {
    height: var(--bs-app-header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    flex-shrink: 0;
}
</style>