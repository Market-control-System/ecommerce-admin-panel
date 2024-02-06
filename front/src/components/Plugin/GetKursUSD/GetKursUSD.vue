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
    <div>
        <div v-if="kursStore.isLoad">LOAD...</div>
        <div v-if="kursStore.err">ERROR load kurs</div>
        <div v-if="!kursStore.err && !kursStore.isLoad">
            Kurs usd - {{ kursStore.usd }}
        </div>
    </div>
</template>
