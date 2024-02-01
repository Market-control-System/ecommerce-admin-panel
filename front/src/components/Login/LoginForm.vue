<script setup>
/**
 * форма атворизации
 * - ввод логина (номер телефона и пароль)
 * - валидация номера телефона и пароля (на пустоту)
 * - вызов апи-контроллера для отправки данных формы на сервер
 * - анализ ответа --- вывод ошибки
 * либо генерация события про успешную авторизацию и передача события родителю
 */
import { ref, computed, defineEmits } from 'vue';
import useAuthStore from '@/stores/authStore';
import useAlertModalStore from '@/stores/alertModalStore';

const authStore = useAuthStore();
const alertModalStore = useAlertModalStore();
const emit = defineEmits(['loginEnd']); // событие окончания атворизации

const loginAuth = ref('');
const passwordAuth = ref('');

const isValidLoginAuth = ref('');

const validLogin = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // только цифры
    value = value.substring(0, 10); // ограничить длину до 10 цифр
    const parts = [];

    parts.push(value.substring(0, 3)); // Первые 3 цифры
    if (value.length > 3) parts.push(value.substring(3, 6)); // Следующие 3 цифры
    if (value.length > 6) parts.push(value.substring(6, 8)); // Следующие 2 цифры
    if (value.length > 8) parts.push(value.substring(8, 10)); // Последние 2 цифры

    loginAuth.value = parts.join('-');

    isValidLoginAuth.value = authStore.validLogin(loginAuth.value);
};

const loginInputClasses = computed(() => {
    if (isValidLoginAuth.value === '') {
        return {};
    }
    return {
        'is-valid': isValidLoginAuth.value,
        'is-invalid': !isValidLoginAuth.value,
    };
});

const sendLoginForm = async () => {
    const result = await authStore.login({
        loginAuth: loginAuth.value,
        passwordAuth: passwordAuth.value,
    });
    if (result.err) {
        alertModalStore.openModal(result.message, result.status);
    } else {
        emit('loginEnd', true);
    }
};
</script>

<template>
    <form @submit.prevent="sendLoginForm">
        <div class="mb-3">
            <label for="login-username" class="form-label">Phone Number</label>
            <input
                type="text"
                class="form-control"
                :class="loginInputClasses"
                id="login-username"
                placeholder="099-111-22-33"
                v-model="loginAuth"
                @input="validLogin"
                required>
        </div>
        <div class="mb-3">
            <label for="login-password" class="form-label">Пароль</label>
            <input
                type="password"
                class="form-control"
                id="login-password"
                placeholder="пароль"
                v-model="passwordAuth"
                required>
        </div>
        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Login to Sysytem</button>
    </form>
</template>
