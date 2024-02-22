<script setup>
import { ref, computed } from 'vue';

const activeSection = ref('category');

const props = defineProps({
    xmlInfo: Object,
    product: Object,
    catList: Array,
    id: Number,
    kurs: Number,
});

const selectedCategoryDesc = ref(''); // Описание выбранной категории
const selectedCategoryName = ref(''); // Название выбранной категории
const productCatId = ref('');
const productId = ref(props.product.id);
const productKod = ref(props.product.kod);
const productVendor = ref('Без бренду');
const productNameRU = ref(props.product.title.ru);
const productNameUA = ref(props.product.title.ua);
const prodyctDescRU = ref(props.product.description.ru);
const prodyctDescUA = ref(props.product.description.ua);

// eslint-disable-next-line arrow-body-style
const priceUsd = computed(() => {
    return Math.round(props.product.price.value * props.kurs);
});

// Функция для обработки изменения выбранной категории
const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    const selectedCategory = props.catList.find((cat) => cat.id === selectedId);
    selectedCategoryDesc.value = selectedCategory ? selectedCategory.desc : ''; // Обновляем описание
    selectedCategoryName.value = selectedCategory ? selectedCategory.ua : '';
};

// Функция для изменения активного раздела
const setActiveSection = (section) => {
    activeSection.value = section;
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
            <div class="col-md-8">
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button
                        type="button"
                        class="btn"
                        :class="{'btn-outline-primary': activeSection !== 'category', 'btn-primary': activeSection === 'category'}"
                        @click="setActiveSection('category')">
                        Категория
                    </button>
                    <button
                        type="button"
                        class="btn"
                        :class="{'btn-outline-primary': activeSection !== 'name', 'btn-primary': activeSection === 'name'}"
                        @click="setActiveSection('name')">
                        Название
                    </button>
                    <button
                        type="button"
                        class="btn"
                        :class="{'btn-outline-primary': activeSection !== 'foto', 'btn-primary': activeSection === 'foto'}"
                        @click="setActiveSection('foto')">
                        Фото
                    </button>
                    <button
                        type="button"
                        class="btn"
                        :class="{'btn-outline-primary': activeSection !== 'description', 'btn-primary': activeSection === 'description'}"
                        @click="setActiveSection('description')">
                        Описание
                    </button>
                    <button
                        type="button"
                        class="btn"
                        :class="{'btn-outline-primary': activeSection !== 'params', 'btn-primary': activeSection === 'params'}"
                        @click="setActiveSection('params')">
                        Характеристики
                    </button>
                </div>
            </div>
            <div class="col-md-4">
                <button class="btn btn-outline-success">
                    Сохранить
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2 vot-ok">
                <div v-if="!props.xmlInfo.category.id" class="alert alert-warning alert-sm" role="alert">
                    Текущая категория - не определена
                </div>
                <div v-if="props.xmlInfo.foto.length === 0" class="alert alert-warning alert-sm" role="alert">
                    Нет фото
                </div>
            </div>
            <div class="col-md-10">
                <div id="cat-xml-form" v-if="activeSection === 'category'">
                    <div v-if="!props.xmlInfo.category.id">
                        <label :for="`input-cat${props.id}`">категория на Розетке</label><br />
                        <select
                            :id="`input-cat${props.id}`"
                            class="form-select"
                            name="input-cat-id"
                            is-invalid @change="handleCategoryChange"
                            v-model="productCatId">
                            <option value="0">Выбрать категорию</option>
                            <option v-for="cat in props.catList" :key="cat.id" :value="cat.id">
                                {{ cat.ua }}
                            </option>
                        </select>
                        <input
                            type="hidden"
                            name="input-cat-name"
                            id="input-cat-name"
                            v-model="selectedCategoryName">
                    </div>
                    <div v-else class="alert alert-success" role="alert">
                        {{ props.xmlInfo.category.ua }}
                    </div>
                    <div class="cat-xml-desc">
                        {{ selectedCategoryDesc }}
                    </div>
                </div>
                <div id="name-xml-form" v-if="activeSection === 'name'">
                    <div class="input-group mb-3">
                        <label class="input-group-text">Id</label>
                        <input
                            type="text"
                            id="input-id"
                            name="input-id"
                            class="form-control"
                            v-model="productId" disabled>
                        <span class="input-group-text">Код</span>
                        <input
                            type="text"
                            id="input-kod"
                            name="input-kod"
                            class="form-control"
                            v-model="productKod" disabled>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text">Price грн.</label>
                        <input
                            type="text"
                            id="input-price"
                            name="input-price"
                            class="form-control"
                            v-model="priceUsd">
                        <span class="input-group-text">Vendor</span>
                        <input
                            type="text"
                            id="input-kod"
                            name="input-kod"
                            class="form-control"
                            v-model="productVendor">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text">Название RU</label>
                        <input
                            type="text"
                            id="input-name-ru"
                            name="input-name-ru"
                            class="form-control"
                            v-model="productNameRU">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text">Название UA</label>
                        <input
                            type="text"
                            id="input-name-ua"
                            name="input-name-ua"
                            class="form-control"
                            v-model="productNameUA">
                    </div>
                </div>
                <div id="foto-xml-form" v-if="activeSection === 'foto'">

                </div>
                <div id="desc-xml-form" v-if="activeSection === 'description'">
                    <div class="input-group">
                        <span class="input-group-text">RU</span>
                        <textarea
                            class="form-control"
                            aria-label="RU"
                            id="input-description-ru"
                            v-model="prodyctDescRU">
                        </textarea>
                    </div>
                    <br />
                    <div class="input-group">
                        <span class="input-group-text">UA</span>
                        <textarea
                            class="form-control"
                            aria-label="UA"
                            id="input-description-ua"
                            v-model="prodyctDescUA">
                        </textarea>
                    </div>
                </div>
                <div id="params-xml-form" v-if="activeSection === 'params'">
                    <div class="input-group">
                        <label class="input-group-text">Название</label>
                        <input
                            type="text"
                            id="input-param-name1"
                            name="input-param-name1"
                            class="form-control"
                            value="Країна виробник">
                        <label class="input-group-text">UA</label>
                        <input
                            type="text"
                            id="input-param-valuk1"
                            name="input-param-valuk1"
                            class="form-control"
                            value="Китай">
                        <label class="input-group-text">RU</label>
                        <input
                            type="text"
                            id="input-param-valru1"
                            name="input-param-valru1"
                            class="form-control"
                            value="Китай">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.vot-ok {
    font-size: 12px;
}
.button-row {
    margin-bottom: 10px;
}
select, input {
    background-color: black;
    color: white;
}
.cat-xml-desc {
    margin: 10px;
}
</style>
