<script setup>
const props = defineProps({
    xmlInfo: Object,
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
        <div class="row">
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
            <b>Текущая категория - </b>
            <span v-if="!props.xmlInfo.category.id" class="label label-alert">НЕ определена</span>
        </div>
    </div>
</template>

<style scoped>
</style>
