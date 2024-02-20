<script setup>
const props = defineProps({
    xmlInfo: Object,
    catList: Array,
    id: Number,
});

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
                <label :for="`catRozetka${props.id}`">Выбрать категорию</label><br />
                <select v-for="cat in props.catList" :key="cat.id" :id="`catRozetka${props.id}`">
                    <option :value="cat.id">
                        {{ cat.ua }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button-row {
    margin-bottom: 10px;
}
</style>
