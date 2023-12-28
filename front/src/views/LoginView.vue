<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useErrorStore } from '@/store/error';

const errorStore = useErrorStore();
const authStore = useAuthStore();
const phoneNumber = ref('');
const loginPassword = ref('');

const formatPhoneNumber = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    value = value.substring(0, 10); // ограничить длину до 10 цифр
    const parts = [];

    parts.push(value.substring(0, 3)); // Первые 3 цифры
    if (value.length > 3) parts.push(value.substring(3, 6)); // Следующие 3 цифры
    if (value.length > 6) parts.push(value.substring(6, 8)); // Следующие 2 цифры
    if (value.length > 8) parts.push(value.substring(8, 10)); // Последние 2 цифры

    phoneNumber.value = parts.join('-');
};

const validateAndLogin = () => {
    // Простая валидация
    if (!phoneNumber.value || phoneNumber.value.length < 12) {
        errorStore.setError({msg:'Please enter a valid phone number', component:'Login Form'});
        return;
    }
    if (!loginPassword.value) {
        errorStore.setError({msg:'Please enter a password', component:'Login Form'});
        return;
    }
    // Вызов функции аутентификации
    authStore.login(phoneNumber.value, loginPassword.value);
    console.log('Login with:', phoneNumber.value, loginPassword.value);
};

</script>

<template>
    <div class="container container-center">
        <div class="login-div">
            <form class="alert alert-secondary" @submit.prevent="validateAndLogin">
                <div class="mb-3">
                    <label for="loginPhone" class="form-label">Phone number login</label>
                    <input  type="text" class="form-control" id="loginPhone" placeholder="097-333-222-11"
                            v-model="phoneNumber" 
                            @input="formatPhoneNumber">
                </div>
                <div class="mb-3">
                    <label for="inputPassword5" class="form-label">Password</label>
                    <input  type="password" id="loginPassword" class="form-control" aria-describedby="passwordHelpBlock"
                            v-model="loginPassword" 
                            autocomplete="on">
                </div>
                <div class="mb-3" style="text-align: center;">
                    <button type="submit" class="btn btn-outline-primary">Login to system</button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<style scoped>
.container-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.login-div {
        width: 300px;
    }
</style>