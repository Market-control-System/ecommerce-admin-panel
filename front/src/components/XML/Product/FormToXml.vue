<script setup>
import { ref } from 'vue';

const props = defineProps({
    xmlInfo: Object,
    catList: Array,
    id: Number,
});

const selectedCategoryDesc = ref(''); // Описание выбранной категории

// Функция для обработки изменения выбранной категории
const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    const selectedCategory = props.catList.find((cat) => cat.id === selectedId);
    selectedCategoryDesc.value = selectedCategory ? selectedCategory.desc : ''; // Обновляем описание
};
/**
 *  "productInXML": { "kod": null, "id": null, "url": null, "vendor": null,
 *      "param": [ { "name": null, "valueUK": null, "valueRU": null } ],
 *      "available": false, "quantity_in_stock": null,
 *      "category": { "id": null, "ru": null, "ua": null, "rz": null },
 *      "price": { "value": null, "currency": "USD" },
 *      "title": { "ru": null, "ua": null },
 *      "description": { "ru": null, "ua": null },
 *      "foto": [] } } }
 */
</script>

<template>
    <div>
        <div class="row button-row">
            <div class="col-md-12">
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-outline-primary active">Категория</button>
                    <button type="button" class="btn btn-outline-primary" disabled>Название</button>
                    <button type="button" class="btn btn-outline-primary" disabled>Фото</button>
                    <button type="button" class="btn btn-outline-primary" disabled>Описание</button>
                    <button type="button" class="btn btn-outline-primary" disabled>Характеристики</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div v-if="!props.xmlInfo.category.id" class="alert alert-warning alert-sm" role="alert">
                    Текущая категория - не определена
                </div>
                <div v-else class="alert alert-success" role="alert">
                    {{ props.xmlInfo.category.ua }}
                </div>
            </div>
            <div class="col-md-9">
                <div v-if="!props.xmlInfo.category.id">
                    <label :for="`catRozetka${props.id}`">категория на Розетке</label><br />
                    <select :id="`catRozetka${props.id}`" class="form-select" is-invalid @change="handleCategoryChange">
                        <option value="0">Выбрать категорию</option>
                        <option v-for="cat in props.catList" :key="cat.id" :value="cat.id">
                            {{ cat.ua }}
                        </option>
                    </select>
                </div>
                <div class="cat-xml-desc">
                    {{ selectedCategoryDesc }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button-row {
    margin-bottom: 10px;
}
select {
    background-color: var(--bs-body-bg);
    background-color: black;
    color: white;
}
.cat-xml-desc {
    margin: 10px;
}
</style>
