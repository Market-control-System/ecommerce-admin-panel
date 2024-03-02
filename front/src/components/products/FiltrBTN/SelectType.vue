<script setup>
import { ref, watch } from 'vue';
import typeListDefault from '@/config/constantu/typeList';

const props = defineProps({
    typeList: {
        default: typeListDefault(),
    },
});

const emit = defineEmits(['update:selectedType']);
const selectedType = ref(0);

watch(selectedType, (newValue) => {
    // Логика обработки изменения выбранного типа
    emit('update:selectedType', newValue);
});
</script>

<template>
    <label style="display: none;">Тип запчасти</label>
    <select
        class="form-control"
        v-model="selectedType">
        <option value="0">Все Типы</option>
        <option
            v-for="item in props.typeList"
            :key="item.typeId"
            :value="item.typeId">
            {{ item.typeName }}
        </option>
    </select>
</template>
