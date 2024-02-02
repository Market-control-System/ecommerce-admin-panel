<script setup>
import config from '@/config/config';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/authStore';
import useUserStore from '@/stores/userStore';
import ButtonLogout from '../Login/ButtonLogout.vue';

const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();

const buttonExitClick = async (clickBTN) => {
    if (!clickBTN) {
        // false - click to login
        authStore.logout();
        router.push('/user/login');
    } else {
        // true - click to logout
        authStore.logout();
        router.push('/');
    }
};

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">{{ config.nameProject }}</router-link>
            <div class="navbar-nav mr-auto">
                {{userStore.userInfo.userName}}
            </div>
            <div class="navbar-nav mr-auto">
                <ButtonLogout
                    :is-user-auth="userStore.isUserAuth"
                    @exit="buttonExitClick"
                />
            </div>
        </div>
    </nav>
</template>

<style scoped>
.bi-check {
    fill: #f8f9fa;
}
</style>
