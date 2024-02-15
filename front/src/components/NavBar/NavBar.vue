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
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link class="nav-link dropdown-toggle"
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                                Пользователи
                        </router-link>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link
                            class="nav-link dropdown-toggle"
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                                XML
                        </router-link>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link
                                    class="dropdown-item"
                                    to="/xml/rozetka">
                                        Rozetka XML
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    class="dropdown-item"
                                    to="#">
                                        Epicentr XML
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="navbar-nav mr-auto">
                {{userStore.userInfo.userName}} |
                Role - {{ userStore.userInfo.role }} |
                User Id - {{ userStore.userInfo.userId }}
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
nav {
    border-bottom: 1px solid whitesmoke;
}
.bi-check {
    fill: #f8f9fa;
}
</style>
