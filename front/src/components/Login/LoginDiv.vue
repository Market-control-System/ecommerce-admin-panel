<script setup>
import { useRouter } from 'vue-router';
import LoginForm from './LoginForm.vue';

/**
 * компонент - вывод формы для атворизации
 * - подключаем саму форму - она все делает сама
 * - в случаи успешной атворизации получаем событие loginEnd с значением true
 * - после чего - перенаправляем на главную страницу админки
 */
const router = useRouter();

const loginEnd = (isLogin) => {
    if (isLogin) {
        router.push('/');
    }
};
</script>

<template>
    <div class="login-div">
            <LoginForm @login-end="loginEnd" />
        </div>
</template>
