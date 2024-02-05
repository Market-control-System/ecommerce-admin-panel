<script setup>
import { onMounted } from 'vue';

import AlertAllInfoModal from '@/components/ModalWindow/AlertAllInfoModalWindow.vue';
import useAlertModalStore from './stores/alertModalStore';
import useAuthStore from './stores/authStore';

onMounted(async () => {
    const authStore = useAuthStore();
    const alertModalStore = useAlertModalStore();

    const resAuth = await authStore.initializeUser();
    if (resAuth.err) {
        alertModalStore.openModal(resAuth.message, resAuth.status || 300);
    }
});
</script>

<template>
    <router-view/>
    <AlertAllInfoModal />
</template>
