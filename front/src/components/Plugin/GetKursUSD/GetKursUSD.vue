<script setup>
/**
* получение курса валют
*/
import { onMounted } from 'vue';
import useKursStore from './kursStore';

const kursStore = useKursStore();

const props = defineProps({
    token: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    await kursStore.getKurs(props.token);
});
</script>
<template>
    <div class="bg-dark bg-opacity-75 text-center align-middle">
        <div v-if="kursStore.isLoad"
            class="
                get-kurs
                border border-opacity-50 border-warning
                rounded rounded-4">
            LOAD...
        </div>
        <div v-if="kursStore.err"
            class="
                get-kurs
                border border-opacity-50 border-danger
                rounded rounded-4">
            ERROR load kurs
        </div>
        <div v-if="!kursStore.err && !kursStore.isLoad"
        class="
                get-kurs
                border border-opacity-50 border-success
                rounded rounded-4">
            Курс<br/>
            1 USD: {{ kursStore.usd }} грн.
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "./getKurs.css";
</style>
