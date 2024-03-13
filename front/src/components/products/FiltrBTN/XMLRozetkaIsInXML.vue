<script setup>
import { ref } from 'vue';
import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
/**
 * 'isInXml' - фильтруем по наличию товара в XML
 * 'isOstatok' - фильтруем по наличию товара на складе
 */
const props = defineProps({
    checkText: String,
    checkType: {
        type: String,
        validator: (value) => ['isInNotXml', 'isOstatok'].includes(value),
        default: 'isInNotXml',
    },
});

const xmlRoetkaStore = useXmlRozetkaStore();
const checkValue = ref(false);

const changeCheck = () => {
    console.log(props.checkType, ' ---- ', checkValue.value);
    if (props.checkType === 'isInNotXml') {
        // Предположим, что этот метод обрабатывает логику для isInNotXml
        xmlRoetkaStore.filtrIsInNotXML(checkValue.value);
    } else if (props.checkType === 'isOstatok') {
        // Предположим, что есть другой метод для обработки isOstatok
        xmlRoetkaStore.filtrIsOstatok(checkValue.value);
    }
};
</script>

<template>
    <div class="form-check">
        <input
            class="form-check-input"
            type="checkbox"
            v-model="checkValue"
            @change="changeCheck">
        <label class="form-check-label">
            {{ props.checkText }}
        </label>
    </div>
</template>
<style scoped>
</style>
