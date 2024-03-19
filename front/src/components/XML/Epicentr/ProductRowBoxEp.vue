<script setup>
import { ref } from 'vue';
import catParamEpic from '@/config/paramEpic/catParamsEpic';

const props = defineProps({
    product: Object,
    catList: Array,
});

const selectEpicCat = ref({
    id: 0,
    ua: null,
    desc: null,
});
const paramsFromCat = ref([]); // набор параметров для категории

const selectCatChange = async (event) => {
    const selectedId = event.target.value;
    // console.log('CHANGE cat to id  - ', parseInt(selectedId, 10));
    const selectedCategory = props.catList.find((cat) => cat.id === parseInt(selectedId, 10));
    // console.log('SERACH IN props.catList', props.catList);
    // console.log('RESULT SEARCH - ', selectedCategory);

    selectEpicCat.value = { ...selectedCategory };
    // console.log('CHANGE cat - ', selectEpicCat);

    // загружаем новый набор параметров для выбранной категории
    const propertyName = `cat${selectedId}`;
    paramsFromCat.value = [...catParamEpic[propertyName]];
};
</script>

<template>
    <div class="row">
        <div class="col-md-3">
            <b>{{ props.product.kod }}</b><br/>
            RU: {{ props.product.title.ru }}<br/>
            UA: {{ props.product.title.ua }}<br/>
            <img :src="props.product.foto[0]" alt="foto" class="img-foto"/>
        </div>
        <div class="col-md-3">
            Описание:<br/>
            {{  props.product.description.ru }}
        </div>
        <div class="col-md-6">
            <label>Категория в Эпицентре</label>
            <select
                class="form-control"
                v-model="selectEpicCat.id"
                @change="selectCatChange">
                <option value="0">Выбрать категорию</option>
                <option v-for="cat in props.catList" :key="cat.id" :value="cat.id">
                    {{ cat.ua }}
                </option>
            </select>
            {{ selectEpicCat.desc }}<br/>
            Параметры<br/>
            <div>{{ paramsFromCat }}</div>
        </div>
    </div>
</template>

<style scoped>
.zp-in-site {
    border-right: 1px solid green;
}
.foto-box {
    margin: 5px;
}
.img-foto {
    width: 100px;
}
</style>
