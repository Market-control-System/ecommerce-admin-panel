<script setup>
import { onMounted } from 'vue';
import ErrorDiv from './components/ErrorDiv.vue';
import { useAuthStore } from './store/auth';
import { useTokenStore } from './store/token';


const authStore = useAuthStore();
const tokenStore = useTokenStore();


const savedUserData = localStorage.getItem('userData');

if (localStorage.getItem('authToken') && savedUserData) {
  authStore.isAuthenticated = true;
  authStore.user = JSON.parse(savedUserData);
}
onMounted( ()=>{
  tokenStore.verifyToken()
  .then(()=>{
    // проверка наличия данніх юзера
    if (!authStore.user || !authStore.isAuthenticated) {
      if (!authStore.setUserDataFromLocalStorage()) {
        tokenStore.clearToken();
      }
    }
  })
  .catch( ()=> {
    tokenStore.clearToken();
  })
});
</script>

<template>
  <router-view/>
  <ErrorDiv />
</template>

<style>
</style>
