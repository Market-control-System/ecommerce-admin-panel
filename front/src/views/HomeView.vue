<script setup>
//import '../assets/styles/mainCarcas.scss';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const exitBtn = () => {
  authStore.logout();
};

</script>

<template>
  <div class="container ">
    <button class="btn btn-primary" @click="exitBtn">Exit</button>
    <div class="row">
      <div class="col-3">
        <div class="left-menu">
          <div class="side-bar-logo">Admin Panel</div>

        </div>
      </div>
      <div class="col-9">
        {{ authStore.user }}
      </div>
    </div>
    
  </div>
</template>

<style lang="scss">
//@import "@/assets/styles/my-component-styles.scss";
</style>